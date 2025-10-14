import { AppEvT } from '@/common/types/events';

export interface WrapEventsPropsT {
  eventT: AppEvT;
  msg: string;
  status: number;
}
