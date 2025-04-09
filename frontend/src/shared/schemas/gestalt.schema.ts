import { RecordId } from 'surrealdb';
import { z } from 'zod';

const GestaltType = z.union([z.literal('list'), z.literal('random')]);
type TGestaltType = z.infer<typeof GestaltType>;

const GestaltState = z.union([z.literal('list'), z.literal('repetition')]);
type TGestaltState = z.infer<typeof GestaltType>;

const GestaltSchema = z.object({
  id: z.instanceof(RecordId<'gestalt'>),
  in: z.instanceof(RecordId<'user'>),
  listIndex: z.number().int().positive(),
  out: z.instanceof(RecordId<'set'>),
  randomList: z.array(z.instanceof(RecordId<'card'>)),
  repetitionIndex: z.number().int().positive(),
  state: GestaltState,
  type: GestaltType
});

type TGestalt = z.infer<typeof GestaltSchema>;

export { GestaltSchema, GestaltState, GestaltType, type TGestalt, type TGestaltState, type TGestaltType };
