import type { Mutation, Query } from '@farfetched/core';
import type { TTranslationOptions } from '@widgets/ToastNotification';
import type { RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import type { Effect, Event, EventCallable } from 'effector';
import type { TSession } from './session.schema';
import { retry } from '@farfetched/core';
import { SurrealError } from '@settings/surreal';
import * as dbApi from '@settings/surreal';
import { getErrorStatus } from '@shared/api';
import { displayRequestError } from '@widgets/ToastNotification';
import { chainRoute } from 'atomic-router';
import {
  attach,
  createEffect,
  createEvent,
  createStore,

  is,
  sample,
  split
} from 'effector';

import { and, not } from 'patronum';
import { createSessionAuthMut, createSessionRefreshMut, createSessionSignOutMut } from './session.api';
import { SessionSchema } from './session.schema';

type RemoteOperation = Mutation<any, any, any> | Query<any, any, any, any>;
type RetryConfig<T extends RemoteOperation> = Parameters<typeof retry<T>>['1'];
type Otherwise<T extends RemoteOperation> = Exclude<RetryConfig<T>['otherwise'], undefined>;
type FailInfo<T extends RemoteOperation> = Exclude<Parameters<Otherwise<T>>['0'], undefined>;

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated
}

// #region session
const sessionAuthMut = createSessionAuthMut();
const sessionRefreshMut = createSessionRefreshMut();
const sessionSignOutMut = createSessionSignOutMut();

const dbConnectFx = attach({ effect: dbApi.dbConnectFx });
const dbAuthenticateFx = attach({ effect: dbApi.dbAuthenticateFx });
const dbInvalidateFx = attach({ effect: dbApi.dbInvalidateFx });
const getAuthDbFx = attach({ effect: dbApi.getAuthDbFx });

export const $session = createStore<null | TSession>(null);
export const sessionValidateFx = createEffect<unknown, TSession>((session) => {
  const validSession = SessionSchema.parse(session);

  return validSession;
});
export const sessionChangedFx = createEffect<void, TSession>(async () => {
  const db = await getAuthDbFx();
  const info = (await db.info()) as Exclude<Awaited<ReturnType<typeof db.info>>, undefined>;

  const pickProperties = new Set(SessionSchema.keyof().options as string[]);
  const session = await sessionValidateFx(
    Object.fromEntries(Object.entries(info).filter(entry => pickProperties.has(entry[0])))
  );

  return session;
});

export const sessionAuth = createEvent();
export const sessionSignOut = createEvent();
export const sessionAuthenticateDatabase = createEvent();

const sessionReset = createEvent();

const $authenticationStatus = createStore<AuthStatus>(AuthStatus.Initial);

$session.reset(sessionReset);

// change authentication status
$authenticationStatus.on(sessionAuthMut.started, (status) => {
  if (status === AuthStatus.Initial)
    return AuthStatus.Pending;
  return status;
});
$authenticationStatus.on(dbAuthenticateFx.done, () => AuthStatus.Authenticated);
$authenticationStatus.on(
  [sessionAuthMut.finished.failure, dbAuthenticateFx.fail, sessionSignOutMut.start],
  () => AuthStatus.Anonymous
);

// request token for db
sample({
  clock: sessionAuth,
  filter: not(sessionAuthMut.$pending),
  target: sessionAuthMut.start
});

// success get token -> authenticate db
sample({
  clock: sessionAuthMut.finished.success,
  target: sessionAuthenticateDatabase
});

sample({
  clock: sessionAuthenticateDatabase,
  filter: not(dbAuthenticateFx.pending),
  target: dbAuthenticateFx
});

// success get authenticate db -> extract info on user
sample({
  clock: dbAuthenticateFx.done,
  target: sessionChangedFx
});

// success get extracted info on user -> setting session data
sample({
  clock: sessionChangedFx.doneData,
  target: $session
});

// success refresh -> authenticate session
sample({ clock: sessionRefreshMut.finished.success, target: sessionAuth });

// failure get token -> refresh auth token
sample({
  clock: sessionAuthMut.finished.failure,
  filter: not(sessionRefreshMut.$pending),
  target: sessionRefreshMut.start
});

retry(sessionRefreshMut, {
  delay: 0,
  filter: (data) => {
    if (['400', '401'].includes(getErrorStatus(data.error)))
      return false;

    return true;
  },
  otherwise: sessionSignOut as unknown as EventCallable<FailInfo<typeof sessionSignOutMut>>,
  times: 2
});

// #region retry logic for authenticate in db
const RETRY_ATTEMPTS_ERR_OFFLINE = 2;
const RETRY_ATTEMPTS_ERR_TOKEN_MISSING = 2;

const $retryOffline = createStore<number>(0);
const $retryTokenMissing = createStore<number>(0);

const retryOfflineFx = attach({
  effect: createEffect<number, void>(async (attempt) => {
    if (attempt === RETRY_ATTEMPTS_ERR_OFFLINE)
      throw new Error('The attempts to connect to the database have ended.');

    await dbConnectFx();
  }),
  source: $retryOffline
});

const retryTokenMissingFx = attach({
  effect: createEffect<number, void>((attempt) => {
    if (attempt === RETRY_ATTEMPTS_ERR_TOKEN_MISSING)
      throw new Error('The attempts to authenticate the connection to the database have ended.');
  }),
  source: $retryTokenMissing
});

const displayErrorAuthenticateDb = createEvent();

sample({
  clock: displayErrorAuthenticateDb,
  fn: (): TTranslationOptions => ['error.500'],
  target: displayRequestError
});

split({
  source: dbAuthenticateFx.failData,
  match: (error) => {
    if (error instanceof SurrealError)
      return error.code;

    return '__';
  },
  cases: {
    ERR_OFFLINE: retryOfflineFx,
    ERR_TOKEN_MISSING: retryTokenMissingFx,
    __: displayErrorAuthenticateDb
  }
});

sample({
  clock: retryOfflineFx.done,
  target: sessionAuthenticateDatabase
});

sample({
  clock: retryTokenMissingFx.done,
  target: sessionAuth
});

sample({
  clock: [retryOfflineFx.fail, retryTokenMissingFx.fail],
  target: displayErrorAuthenticateDb
});
// #endregion

// sign out of account
sample({
  clock: sessionSignOut,
  filter: and($session, not(sessionSignOutMut.$pending)),
  target: [sessionSignOutMut.start, sessionReset, dbInvalidateFx]
});

sample({
  clock: sessionSignOutMut.finished.failure,
  target: createEffect(() => console.warn('Server side error.'))
});
// #endregion

// #region chain routes of authorization
interface ChainParams {
  otherwise?: Effect<void, any, any> | Event<void> | EventCallable<void>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Initial,
    target: sessionAuthMut.start
  });

  sample({
    clock: [alreadyAnonymous, sessionAuthMut.finished.failure],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous
  });

  if (otherwise) {
    split({
      source: sessionReceivedAnonymous,
      match: {
        effect: () => is.effect(otherwise),
        event: () => is.event(otherwise)
      },
      cases: {
        effect: otherwise,
        event: otherwise
      }
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionAuthMut.finished.success],
    cancelOn: sessionReceivedAnonymous
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Initial,
    target: sessionAuthMut.start
  });

  sample({
    clock: [alreadyAuthenticated, sessionAuthMut.finished.success],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated
  });

  if (otherwise) {
    split({
      source: sessionReceivedAuthenticated,
      match: {
        effect: () => is.effect(otherwise),
        event: () => is.event(otherwise)
      },
      cases: {
        effect: otherwise,
        event: otherwise
      }
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionAuthMut.finished.failure],
    cancelOn: sessionReceivedAuthenticated
  });
}

export function chainOptionalAuthorization<Params extends RouteParams>(
  route: RouteInstance<Params>
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: status => status === AuthStatus.Initial,
    target: sessionAuthMut.start
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, alreadyAuthenticated, sessionAuthMut.finished.finally]
  });
}
// #endregion
