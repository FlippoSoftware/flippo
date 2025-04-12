import { RecordId } from 'surrealdb';
import { z } from 'zod';

const SetSchema = z.object({
  author: z.instanceof(RecordId<'user'>),
  cards: z.array(z.instanceof(RecordId<'card'>)),
  countCards: z.number().int().positive(),
  created: z.coerce.date(),
  description: z.string(),
  id: z.instanceof(RecordId<'set'>),
  name: z.string(),
  publication: z.instanceof(RecordId<'publication'>),
  updated: z.coerce.date()
});

type TSet = z.infer<typeof SetSchema>;

export { SetSchema, type TSet };
