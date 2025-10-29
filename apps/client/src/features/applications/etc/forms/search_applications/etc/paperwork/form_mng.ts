import { FormArrayMng } from '@/core/paperwork/etc/form_array';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import z, { ZodArray, ZodEnum, ZodObject, ZodOptional, ZodString } from 'zod';
import { SearchApplicationsUiFkt } from '../ui_fkt';
import { BaseSearchBarSchemaT } from '@/core/paperwork/etc/search_bar';

export class SearchApplicationsFormMng {
  public static readonly schema: ZodObject<{
    status: ZodOptional<ZodArray<ZodEnum>>;
    appliedAtSort: ZodOptional<ZodString>;
  }> &
    BaseSearchBarSchemaT = z.object({
    txtInputs: z.array(FormArrayMng.formFieldItemSchema).optional(),
    status: z.array(z.enum(Object.values(ApplicationStatusT))).optional(),
    createdAtSort: z.string().optional(),
    updatedAtSort: z.string().optional(),
    appliedAtSort: z.string().optional(),
  });

  public static readonly form: FormGroup = new FormGroup({
    txtInputs: new FormArray([new FormControl(SearchApplicationsUiFkt.companyName())]),
    status: new FormControl(''),
    createdAtSort: new FormControl(''),
    updatedAtSort: new FormControl(''),
    appliedAtSort: new FormControl(''),
  });
}

export type SearchApplicationsFormT = z.infer<typeof SearchApplicationsFormMng.schema>;
