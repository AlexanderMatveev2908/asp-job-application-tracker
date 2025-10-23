import { TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields';

export class ConfMailUiFkt extends FormFieldsUiFkt {
  public static readonly mailField: TxtFieldT = this.txtFieldOf({ name: 'email' });
}
