import { RecordId } from 'surrealdb';
import { z } from 'zod';

const RepetitionSchema = z.object({
  cards: z.array(z.instanceof(RecordId<'card'>)),
  id: z.instanceof(RecordId<'repetition'>),
  in: z.instanceof(RecordId<'user'>),
  out: z.instanceof(RecordId<'set'>)
});

type TRepetition = z.infer<typeof RepetitionSchema>;

export { RepetitionSchema, type TRepetition };
