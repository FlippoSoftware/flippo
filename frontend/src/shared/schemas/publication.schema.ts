import { RecordId } from 'surrealdb';
import { z } from 'zod';

import { SourceType } from './source.schema';

const PublicationSchema = z.object({
  author: z.instanceof(RecordId<'user'>),
  created: z.coerce.date(),
  id: z.instanceof(RecordId<'publication'>),
  in: z.instanceof(RecordId<'user'>),
  out: SourceType,
  updated: z.coerce.date()
});

type TPublication = z.infer<typeof PublicationSchema>;

export { PublicationSchema, type TPublication };
