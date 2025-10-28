import { TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';

export class ApplicationFormUiFkt extends FormFieldsUiFkt {
  public static first3Rows: () => TxtFieldT[] = () => [
    this.txtFieldOf({ name: 'companyName' }),
    this.txtFieldOf({ name: 'positionName' }),
    this.txtFieldOf({ name: 'notes', type: 'textarea' }),
  ];
}
