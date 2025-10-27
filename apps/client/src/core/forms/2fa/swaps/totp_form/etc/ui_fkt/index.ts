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

  private static fieldsForPart(outerIdx: number): TxtFieldT[] {
    const perPart: number = this.nFields / this.parts;

    return Array.from({ length: perPart }, (_: undefined, innerIdx: number) =>
      this.txtFieldOf({ name: 'totp', field: `totp.${outerIdx * perPart + innerIdx}` })
    );
  }

  public static partsFields(): TotpPartFieldsT[] {
    return Array.from({ length: this.parts }, (_: undefined, outerIdx: number) =>
      this.withID({
        fields: this.fieldsForPart(outerIdx),
      })
    );
  }
}
