import { SvgFillLockClose } from '@/common/components/svgs/fill/lock_close/lock-close';
import { SvgFillLockOpen } from '@/common/components/svgs/fill/lock_open/lock-open';
import { TxtFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields/0.root';
import { RecMetaPwdT } from '../types';

export class PwdFormUiFkt extends FormFieldsUiFkt {
  private static readonly pwdField: TxtFieldT = this.txtFieldOf({ name: 'password' });

  private static readonly mapMetaPwd: Map<boolean, RecMetaPwdT> = new Map<boolean, RecMetaPwdT>([
    [
      true,
      {
        type: 'password',
        Svg: SvgFillLockClose,
      },
    ],
    [
      false,
      {
        type: 'text',
        Svg: SvgFillLockOpen,
      },
    ],
  ]);

  public static metaByBool(val: boolean): RecMetaPwdT {
    return this.mapMetaPwd.get(val) as RecMetaPwdT;
  }
}
