import { RecordId } from 'surrealdb';
import { z } from 'zod';

const FolderToSchema = z.object({
  id: z.instanceof(RecordId<'folderTo'>),
  in: z.instanceof(RecordId<'folder'>),
  out: z.instanceof(RecordId<'set'>)
});

type TFolderTo = z.infer<typeof FolderToSchema>;

export { FolderToSchema, type TFolderTo };
