import { AppEventT } from '@/common/types/events';
import { PairTxtSvgConfT } from '../../pair_txt_svg/etc/types';

export interface CmnShadowConfT extends PairTxtSvgConfT {
  eventT: AppEventT;
}
