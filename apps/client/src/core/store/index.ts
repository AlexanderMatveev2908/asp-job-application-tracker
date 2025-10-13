import { sideReducer, SideStateT } from '@/features/sidebar_slice/reducer/reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface StoreStateT {
  side: SideStateT;
}

export const rootReducer: ActionReducerMap<StoreStateT> = {
  side: sideReducer,
};
