import { type Mutation, type Query, retry } from '@farfetched/core';
import {
  dbConnect,
  getAuthDbFx,
  dbAuthenticateFx as originalDbAuthenticateFx,
  dbInvalidateFx as originalDbInvalidateFx,
  SurrealError,
  type TSurrealAuthenticateError
} from '@settings/surreal';
import { getErrorStatus } from '@shared/api';
import { chainRoute, type RouteInstance, type RouteParams, type RouteParamsAndQuery } from 'atomic-router';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  type Effect,
  type Event,
  type EventCallable,
  is,
  sample,
  split
} from 'effector';
import { and, not } from 'patronum';

import { createSessionAuthMut, createSessionRefreshMut, createSessionSignOutMut } from './session.api';
import { SessionSchema, type TSession } from './session.schema';

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

const dbAuthenticateFx = attach({ effect: originalDbAuthenticateFx });
const dbInvalidateFx = attach({ effect: originalDbInvalidateFx });

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
    Object.fromEntries(Object.entries(info).filter((entry) => pickProperties.has(entry[0])))
  );

  return session;
});

export const sessionAuth = createEvent();
export const sessionSignOut = createEvent();
export const sessionRefresh = createEvent();
export const sessionAuthenticateDatabase = createEvent();

const sessionReset = createEvent();

const $authenticationStatus = createStore<AuthStatus>(AuthStatus.Initial);

$session.reset(sessionReset);

// change authentication status
$authenticationStatus.on(sessionAuthMut.started, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
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

// failure get token -> refresh auth token
sample({
  clock: sessionAuthMut.finished.failure,
  target: sessionRefresh
});

sample({
  clock: [sessionRefresh, sessionAuthMut.finished.failure],
  filter: not(sessionRefreshMut.$pending),
  target: sessionRefreshMut.start
});

retry(sessionRefreshMut, {
  delay: 0,
  filter: (data) => {
    if (getErrorStatus(data.error) === '500') return false;

    return true;
  },
  otherwise: sessionSignOut as unknown as EventCallable<FailInfo<typeof sessionSignOutMut>>,
  times: 2
});

// success refresh -> authenticate session
sample({ clock: sessionRefreshMut.finished.success, target: sessionAuth });

split({
  source: dbAuthenticateFx.failData,
  match: (error) => {
    if (error instanceof SurrealError) {
      return error.code;
    }

    return '__';
  },
  cases: {
    ERR_OFFLINE: dbConnect,
    ERR_TOKEN_MISSING: sessionAuth,
    __: createEffect(() => console.error('Fail authenticate db.'))
  }
});

// sign out of account
sample({
  clock: sessionSignOut,
  filter: and($session, not(sessionSignOutMut.$pending)),
  target: [sessionSignOutMut.start, sessionReset]
});

sample({
  clock: sessionSignOutMut.started,
  target: dbInvalidateFx
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
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
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
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
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
    filter: (status) => status === AuthStatus.Authenticated
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionAuthMut.start
  });

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, alreadyAuthenticated, sessionAuthMut.finished.finally]
  });
}
// #endregion
