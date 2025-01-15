import { RecordId } from 'surrealdb';
import { z } from 'zod';

const SourceType = z.union([z.instanceof(RecordId<'folder'>), z.instanceof(RecordId<'set'>)]);
type TSourceType = z.infer<typeof SourceType>;

export { SourceType, type TSourceType };
