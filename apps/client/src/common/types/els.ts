import { PairTxtSvgPropsT } from '../components/pair_txt_svg/etc/types';
import { AppEvT } from './events';

export interface BaseElPropsT extends PairTxtSvgPropsT {
  eventT: AppEvT;
}
