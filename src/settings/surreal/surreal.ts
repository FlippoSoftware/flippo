import { ENV } from '@shared/env';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { type ResponseError, Surreal, type SurrealDbError } from 'surrealdb';

import { getDbTokenCookie, removeDbTokenCookie } from './utils/cookie.utils';
import { SurrealError } from './utils/surreal.error';

type TDbConfig = {
  database: string;
  endpoint: string;
  namespace: string;
};

const DEFAULT_CONFIG: TDbConfig = {
  database: ENV.SURREALDB_DB || 'test',
  endpoint: ENV.SURREALDB_ENDPOINT || 'ws://127.0.0.1:8000/rpc',
  namespace: ENV.SURREALDB_NS || 'test'
};

export const $db = createStore<null | Surreal>(null);
export const $dbConfig = createStore<TDbConfig>(DEFAULT_CONFIG);

export const initDb = createEvent();

export const getDbFx = attach({
  effect: createEffect<null | Surreal, Surreal, SurrealError>((db) => {
    if (!isSurreal(db)) throw SurrealError.DatabaseOffline();
    isConnected(db);

    return db;
  }),
  source: $db
});

export const getAuthDbFx = createEffect<void, Surreal, SurrealError>(async () => {
  const db = await getDbFx();
  await isAuthenticated(db);

  return db;
});

// connecting to database
const dbConnectFx = createEffect<TDbConfig, Surreal, SurrealDbError>(async (config) => {
  const db = new Surreal();

  await db.connect(config.endpoint);
  await db.use({ database: config.database, namespace: config.namespace });
  await db.ready;

  return db;
});

export const dbConnected = dbConnectFx.done;
export const dbFailConnected = dbConnectFx.fail;

// disconnecting from the database
export const dbDisconnectFx = attach({
  effect: createEffect<null | Surreal, void, SurrealDbError>(async (db) => {
    if (db) await db.close();
  }),
  source: $db
});

export type TSurrealAuthenticateError = ResponseError | SurrealError;
// setting up an authenticated connection
export const dbAuthenticateFx = createEffect<void, Surreal, TSurrealAuthenticateError>(async () => {
  const db = await getDbFx();

  const token = getDbTokenCookie();
  if (!token) throw SurrealError.DatabaseTokenMissing();

  await db.authenticate(token);

  return db;
});

export const removeDbTokenCookieFx = createEffect(() => {
  removeDbTokenCookie();
});

// verifying the authenticity of a database connection
export const dbIsAuthenticatedFx = createEffect<void, boolean, SurrealError>(async () => {
  const db = await getDbFx();
  await isAuthenticated(db);

  return true;
});

sample({ clock: initDb, source: $dbConfig, target: dbConnectFx });

sample({
  clock: dbConnectFx.doneData,
  target: $db
});

// #region utils
function isSurreal(db: unknown): db is Surreal {
  return db instanceof Surreal;
}

function isConnected(db: Surreal): true {
  if (!db.connection) throw SurrealError.DatabaseOffline();

  return true;
}

async function isAuthenticated(db: Surreal): Promise<true> {
  const info = await db.info();
  if (!info || !info.id) throw SurrealError.DatabaseUnauthenticated();

  return true;
}
// #endregion

// eslint-disable-next-line effector/no-watch
dbAuthenticateFx.done.watch(() => console.info('DB authenticated'));

// eslint-disable-next-line effector/no-watch
dbAuthenticateFx.failData.watch((error) => console.error(error));
