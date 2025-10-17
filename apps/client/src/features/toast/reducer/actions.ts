import { WithIdT } from '@/common/types/etc';
import { AppEventPayloadT } from '@/common/types/events';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  OPEN_TOAST: createAction('OPEN_TOAST', props<AppEventPayloadT>()),
  SET_ID: createAction('SET_ID', props<WithIdT>()),
  CLOSE_TOAST: createAction('CLOSE_TOAST'),
};
