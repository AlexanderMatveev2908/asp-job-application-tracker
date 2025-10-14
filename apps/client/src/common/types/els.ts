import { PairTxtSvgPropsT } from '../components/pair_txt_svg/etc/types';
import { AppEventT } from './events';

export interface BaseElPropsT extends PairTxtSvgPropsT {
  eventT: AppEventT;
}
