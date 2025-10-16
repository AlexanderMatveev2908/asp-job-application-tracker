import { SpanPropsT } from '../components/els/span/etc/types';
import { AppEventT } from './events';

export interface BaseElPropsT extends SpanPropsT {
  eventT: AppEventT;
}
