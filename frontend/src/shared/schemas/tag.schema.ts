import { RecordId } from 'surrealdb';
import { z } from 'zod';

const TagSchema = z.object({
  created: z.coerce.date(),
  id: z.instanceof(RecordId<'tag'>),
  name: z.string(),
  owner: z.instanceof(RecordId<'user'>),
  updated: z.coerce.date()
});

type TTag = z.infer<typeof TagSchema>;

export { TagSchema, type TTag };
