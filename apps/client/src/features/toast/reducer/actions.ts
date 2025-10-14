import { IdPayloadT } from '@/common/types/etc';
import { AppEventPayload } from '@/common/types/events';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  OPEN_TOAST: createAction('OPEN_TOAST', props<AppEventPayload>()),
  SET_ID: createAction('SET_ID', props<IdPayloadT>()),
  CLOSE_TOAST: createAction('CLOSE_TOAST'),
};
