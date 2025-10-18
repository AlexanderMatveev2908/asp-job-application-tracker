import { SvgFillLockClose } from '@/common/components/svgs/fill/lock_close/lock-close';
import { SvgFillLockOpen } from '@/common/components/svgs/fill/lock_open/lock-open';
import { TxtInputT } from '@/common/types/forms';
import { Type } from '@angular/core';

export interface RecMetaPwdT {
  type: Extract<TxtInputT, 'password' | 'text'>;
  Svg: Type<unknown>;
}

export class PwdMeta {
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
}
