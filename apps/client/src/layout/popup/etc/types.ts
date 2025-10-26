import { AppEventT } from '@/core/lib/dom/meta_event/etc/types';

export interface PopupPropsT {
  cls: PopupClsT;
  isPop: boolean;
  closeOnMouseOut: boolean;
  eventT: AppEventT;
}

export interface PopupStaticPropsT {
  cls: PopupClsT;
  closeOnMouseOut: boolean;
  eventT: AppEventT;
  closePop: () => void;
}

export type PopupClsT = 'wake_up' | 'del_acc';
