import { Opt } from '@/common/types/etc';
import { FormArraySchemaT } from '@/core/paperwork/etc/form_array';
import { SortOrderSchemaT } from '@/core/paperwork/etc/search_bar';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { ZodObject, ZodOptional, ZodString, ZodType } from 'zod';

export class SearchApplicationsFormT {
  public static readonly schema: ZodObject<{
    txtInputs: FormArraySchemaT;

    status: ZodType<Opt<ApplicationStatusT[]>>;

    appliedAtAtSort: ZodOptional<ZodString>;
  }> &
    SortOrderSchemaT;
}
