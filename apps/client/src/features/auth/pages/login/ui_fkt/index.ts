import { SvgFillLockClose } from '@/common/components/svgs/fill/lock_close/lock-close';
import { SvgFillLockOpen } from '@/common/components/svgs/fill/lock_open/lock-open';
import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '@/core/ui_fkt/form_fields';

export class LoginFormUiFkt extends FormFieldsUiFkt {
  public static readonly mailField: TxtFieldT = this.txtFieldOf({ name: 'email', type: 'email' });
  private static readonly pwdField: TxtFieldT = this.txtFieldOf({ name: 'password' });

  public static pwdByType(isTypePwd: boolean): TxtSvgFieldT {
    return {
      ...LoginFormUiFkt.pwdField,
      Svg: isTypePwd ? SvgFillLockClose : SvgFillLockOpen,
      type: isTypePwd ? 'password' : 'text',
    };
  }
}
