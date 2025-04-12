import { RecordId } from 'surrealdb';
import { z } from 'zod';

const StateType = z.union([z.literal('none'), z.literal('reserved'), z.literal('process'), z.literal('ready')]);
type TStateType = z.infer<typeof StateType>;

const CardSchema = z.object({
  answer: z.string(),
  created: z.coerce.date(),
  editors: z.array(z.instanceof(RecordId<'user'>)),
  extendedAnswer: z.string(),
  id: z.instanceof(RecordId<'card'>),
  question: z.string(),
  set: z.instanceof(RecordId<'set'>),
  state: StateType,
  updated: z.coerce.date()
});

type TCard = z.infer<typeof CardSchema>;

export { CardSchema, StateType, type TCard, type TStateType };
