import { Directive, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreStateT } from '../store';
import { UseStorageSvc } from '../hooks/use_storage';

@Directive()
export abstract class UseKitSlice {
  protected readonly store: Store<StoreStateT> = inject(Store<StoreStateT>);
  protected readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
}
