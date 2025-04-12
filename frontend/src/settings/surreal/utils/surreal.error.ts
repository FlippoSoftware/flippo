type TSurrealErrorCode = 'ERR_OFFLINE' | 'ERR_TOKEN_MISSING' | 'ERR_UNAUTHENTICATED';

export class SurrealError extends Error {
  code: TSurrealErrorCode;

  constructor(code: TSurrealErrorCode, message: string) {
    super(message);
    this.code = code;
  }

  static DatabaseOffline() {
    return new SurrealError('ERR_OFFLINE', 'Database is offline!');
  }

  static DatabaseTokenMissing() {
    return new SurrealError('ERR_TOKEN_MISSING', 'Database token is missing!');
  }

  static DatabaseUnauthenticated() {
    return new SurrealError('ERR_UNAUTHENTICATED', 'Database unauthenticated!');
  }
}
