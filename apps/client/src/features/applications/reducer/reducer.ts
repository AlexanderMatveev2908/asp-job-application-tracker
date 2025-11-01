import { Nullable } from '@/common/types/etc';
import { createReducer, on } from '@ngrx/store';
import { ApplicationT } from '../etc/types';
import { ApplicationsActT } from './actions';

export interface ApplicationsStateT {
  applications: Nullable<ApplicationT[]>;
  keyRefresh: number;
}

export const initState: ApplicationsStateT = {
  keyRefresh: 0,
  applications: null,
};

export const applicationsReducer = createReducer(
  initState,
  on(
    ApplicationsActT.SET_APPLICATIONS,
    (state: ApplicationsStateT, action: { applications: ApplicationT[] }) => ({
      ...state,
      applications: action.applications,
    })
  ),
  on(ApplicationsActT.TRIGGER_KEY_REFRESH, (state: ApplicationsStateT) => ({
    ...state,
    keyRefresh: state.keyRefresh + 1,
  })),
  on(ApplicationsActT.RESET_APPLICATIONS, (_: ApplicationsStateT) => initState)
);
