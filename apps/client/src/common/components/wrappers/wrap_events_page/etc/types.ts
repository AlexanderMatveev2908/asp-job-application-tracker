import { AppEventT } from '@/common/types/events';

export interface WrapEventsConfT {
  eventT: AppEventT;
  msg: string;
  status: number;
}
