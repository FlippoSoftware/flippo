import { RecordId } from 'surrealdb';
import { z } from 'zod';

import { SourceType } from './source.schema';

const ViewType = z.union([z.literal('like'), z.literal('person'), z.literal('publication'), z.literal('available')]);
type TViewType = z.infer<typeof ViewType>;

const RoleType = z.union([z.literal('observer'), z.literal('editor'), z.literal('owner')]);
type TRoleType = z.infer<typeof RoleType>;

const RelationshipSchema = z.object({
  id: z.instanceof(RecordId<'relationship'>),
  in: z.instanceof(RecordId<'user'>),
  out: SourceType,
  role: RoleType,
  viewType: ViewType
});

type TRelationship = z.infer<typeof RelationshipSchema>;

export { RelationshipSchema, RoleType, type TRelationship, type TRoleType, type TViewType, ViewType };
