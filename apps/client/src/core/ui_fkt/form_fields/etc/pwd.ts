import { SvgFillLockClose } from '@/common/components/svgs/fill/lock_close/lock-close';
import { SvgFillLockOpen } from '@/common/components/svgs/fill/lock_open/lock-open';
import { TxtInputT, TxtSvgFieldT } from '@/common/types/forms';
import { FormFieldsUiFkt } from '..';
import { SvgT } from '@/common/types/etc';

export interface RecMetaPwdT {
  type: Extract<TxtInputT, 'password' | 'text'>;
  Svg: SvgT;
}

export class PwdUiFkt extends FormFieldsUiFkt {
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

  public static byBool(val: boolean): RecMetaPwdT {
    return this.mapMetaPwd.get(val) as RecMetaPwdT;
  }

  public static pwdByBool(val: boolean): TxtSvgFieldT {
    return {
      ...this.txtFieldOf({ name: 'password' }),
      ...this.byBool(val),
    };
  }

  public static confPwdByBool(val: boolean): TxtSvgFieldT {
    return {
      ...this.txtFieldOf({ name: 'confirmPassword' }),
      ...this.byBool(val),
    };
  }
}
