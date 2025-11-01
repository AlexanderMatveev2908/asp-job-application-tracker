import { Nullable } from '@/common/types/etc';
import { createReducer, on } from '@ngrx/store';
import { ApplicationT } from '../etc/types';
import { ApplicationsActT } from './actions';

export interface ApplicationsStateT {
  applications: Nullable<ApplicationT[]>;
}

export const initState: ApplicationsStateT = {
  applications: null,
};

export const applicationsReducer = createReducer(
  initState,
  on(
    ApplicationsActT.SET_APPLICATIONS,
    (_: ApplicationsStateT, action: { applications: ApplicationT[] }) => ({
      applications: action.applications,
    })
  ),
  on(ApplicationsActT.RESET_APPLICATIONS, (_: ApplicationsStateT) => initState)
);
