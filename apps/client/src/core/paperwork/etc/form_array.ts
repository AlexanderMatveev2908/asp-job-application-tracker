import { ZodArray, ZodObject, ZodOptional, ZodString } from 'zod';

export type FormArraySchemaT = ZodOptional<
  ZodArray<
    ZodObject<{
      id: ZodString;
      name: ZodString;
      field: ZodString;
      label: ZodString;
      val: ZodString;
    }>
  >
>;
