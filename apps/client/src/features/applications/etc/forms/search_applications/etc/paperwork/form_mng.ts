import { FormArrayMng } from '@/core/paperwork/etc/form_array';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import z, { RefinementCtx, ZodArray, ZodEnum, ZodObject, ZodOptional, ZodString } from 'zod';
import { SearchApplicationsUiFkt } from '../ui_fkt';
import { BaseSearchBarSchemaT } from '@/core/paperwork/etc/search_bar';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';

export class SearchApplicationsFormMng extends FormZodMng {
  public static readonly schema: ZodObject<{
    status: ZodOptional<ZodArray<ZodEnum>>;
    appliedAtSort: ZodOptional<ZodString>;
  }> &
    BaseSearchBarSchemaT = z
    .object({
      txtInputs: z.array(FormArrayMng.formFieldItemSchema).optional(),
      status: z.array(z.enum(Object.values(ApplicationStatusT))).optional(),
      createdAtSort: z.string().optional(),
      updatedAtSort: z.string().optional(),
      appliedAtSort: z.string().optional(),
    })
    .superRefine((data: SearchApplicationsFormT, ctx: RefinementCtx) => {
      if ((data.txtInputs?.[0]?.val?.length ?? 0) < 10) {
        ctx.addIssue({
          code: 'custom',
          path: ['txtInputs.0'],
          message: 'Invalid',
        });
      }
    });

  public static readonly form: FormGroup = new FormGroup(
    {
      txtInputs: new FormArray([new FormControl(SearchApplicationsUiFkt.companyName())]),
      status: new FormControl([]),
      createdAtSort: new FormControl(''),
      updatedAtSort: new FormControl(''),
      appliedAtSort: new FormControl(''),
    },
    {
      validators: this.checkZ(this.schema),
    }
  );
}

export type SearchApplicationsFormT = z.infer<typeof SearchApplicationsFormMng.schema>;
