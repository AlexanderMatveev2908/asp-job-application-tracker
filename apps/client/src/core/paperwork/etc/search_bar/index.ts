import z, { ZodObject, ZodOptional, ZodString } from 'zod';
import { FormArraySchemaT } from '../form_array';

export type SearchOrderT = 'ASC' | 'DESC';

export type BaseSearchBarSchemaT = ZodObject<{
  txtInputs: FormArraySchemaT;
  createdAtSort: ZodOptional<ZodString>;
  updatedAtSort: ZodOptional<ZodString>;
}>;

export type BaseSearchBarFormT<T> = z.infer<BaseSearchBarSchemaT> & T;
