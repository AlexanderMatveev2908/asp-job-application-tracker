/* eslint-disable no-magic-numbers */
import { TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';

export interface TotpPartFieldsT {
  fields: TxtFieldT[];
  id: string;
}

export class TotpFormUiFkt extends FormFieldsUiFkt {
  private static readonly _input: TxtFieldT = this.txtFieldOf({ name: 'totp' });

  public static readonly nFields: number = 6;

  public static readonly parts: number = 2;

  public static readonly partsFields: () => TotpPartFieldsT[] = () =>
    new Array(this.parts).fill(
      this.withID({
        fields: new Array(this.nFields / this.parts).fill(this.withID(this._input)),
      })
    );
}
