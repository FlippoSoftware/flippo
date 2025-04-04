import type Surreal from 'surrealdb';

import { createQuery } from '@farfetched/core';
import { type TFolder, type TSet } from '@shared/schemas';

export const userFoldersQu = createQuery<[{ db: Surreal; userId: string }], Pick<TFolder, 'id' | 'name'>[]>({
  handler: async ({ db, userId }) => {
    const [result] = await db.query<[Pick<TFolder, 'id' | 'name'>[]]>(/* surql */ `
    SELECT id, name FROM folder LIMIT 20;`); //WHERE author = $userId LIMIT
    //{ userId }

    return result;
  },
  initialData: []
});

export const userRecentQu = createQuery<[{ db: Surreal; userId: string }], Pick<TSet, 'id' | 'name'>[]>({
  handler: async ({ db, userId }) => {
    const [result] = await db.query<[Pick<TSet, 'id' | 'name'>[]]>(
      /* surql */ `
    SELECT id, name FROM set WHERE author = $userId ORDER BY updated DESC LIMIT 20;
    `,
      {
        userId
      }
    );

    return result;
  },
  initialData: []
});
