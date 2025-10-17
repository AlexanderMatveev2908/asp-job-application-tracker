import { SpanPropsT } from '../components/els/span/etc/types';
import { AppEventT } from './events';

export interface SpanEventPropsT extends SpanPropsT {
  eventT: AppEventT;
}
