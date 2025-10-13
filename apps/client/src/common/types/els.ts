import { PairTxtSvgConfT } from '../components/pair_txt_svg/etc/types';
import { AppEvT } from './events';

export interface BaseElConfT extends PairTxtSvgConfT {
  eventT: AppEvT;
}
