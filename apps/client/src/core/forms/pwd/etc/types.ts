import { SvgT } from '@/common/types/etc';
import { TxtInputT } from '@/common/types/forms';

export interface RecMetaPwdT {
  type: Extract<TxtInputT, 'password' | 'text'>;
  Svg: SvgT;
}
