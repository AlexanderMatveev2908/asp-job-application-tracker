import { ZodObject, ZodString } from 'zod';

export type SearchOrderT = 'ASC' | 'DESC';

export type SortOrderSchemaT = ZodObject<{
  createdAtSort: ZodString;
  updatedAtSort: ZodString;
}>;
