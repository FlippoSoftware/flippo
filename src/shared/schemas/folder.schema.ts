import { RecordId } from 'surrealdb';
import { z } from 'zod';

const FolderSchema = z.object({
  author: z.instanceof(RecordId<'user'>),
  created: z.coerce.date(),
  id: z.instanceof(RecordId<'folder'>),
  name: z.string(),
  updated: z.coerce.date()
});

type TFolder = z.infer<typeof FolderSchema>;

export { FolderSchema, type TFolder };
