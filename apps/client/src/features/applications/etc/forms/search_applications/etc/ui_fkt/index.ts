import { TxtFieldArrayT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';

export class SearchApplicationsUiFkt extends FormFieldsUiFkt {
  public static readonly companyName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'companyName' });

  public static readonly positionName: () => TxtFieldArrayT = () =>
    this.fieldArrayOf({ name: 'positionName' });
}
