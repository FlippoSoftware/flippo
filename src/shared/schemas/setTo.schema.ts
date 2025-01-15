import { RecordId } from 'surrealdb';
import { z } from 'zod';

const SetToSchema = z.object({
  id: z.instanceof(RecordId<'setTo'>),
  in: z.instanceof(RecordId<'set'>),
  out: z.instanceof(RecordId<'tag'>)
});

type TSetTo = z.infer<typeof SetToSchema>;

export { SetToSchema, type TSetTo };
