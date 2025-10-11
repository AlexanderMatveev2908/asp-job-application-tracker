import { ActionReducerMap } from '@ngrx/store';
import { sideReducer, SideStateT } from '../../features/sidebar_slice/reducer/reducer';

export interface StoreStateT {
  side: SideStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  side: sideReducer,
};
