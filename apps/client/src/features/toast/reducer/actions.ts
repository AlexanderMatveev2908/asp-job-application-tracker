import { IdPayloadT } from '@/common/types/etc';
import { AppEventPayload } from '@/common/types/events';
import { createAction, props } from '@ngrx/store';

export const ToastActT = {
  SET_TOAST: createAction('SET_TOAST', props<AppEventPayload>()),
  SET_ID: createAction('SET_ID', props<IdPayloadT>()),
};
