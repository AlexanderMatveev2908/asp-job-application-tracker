import { createReducer } from '@ngrx/store';

export interface ApplicationsStateT {
  applications: null;
}

export const initState: ApplicationsStateT = {
  applications: null,
};

export const applicationsReducer = createReducer(initState);
