import { createAction, props } from '@ngrx/store';
import { ApplicationT } from '../etc/types';

export const ApplicationsActT = {
  SET_APPLICATIONS: createAction('SET_APPLICATIONS', props<{ applications: ApplicationT[] }>()),
  TRIGGER_KEY_REFRESH: createAction('TRIGGER_KEY_REFRESH'),
  RESET_APPLICATIONS: createAction('RESET_APPLICATIONS'),
};
