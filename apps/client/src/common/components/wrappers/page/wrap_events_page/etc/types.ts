import { AppEvT } from '@/common/types/events';

export interface WrapEventsConfT {
  eventT: AppEvT;
  msg: string;
  status: number;
}
