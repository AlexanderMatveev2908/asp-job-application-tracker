/* eslint-disable no-magic-numbers */
import { Nullable, TimerIdT } from '@/common/types/etc';
import { Injectable, Signal } from '@angular/core';
import { BaseSearchBarFormT } from '../paperwork';
import { FormGroup } from '@angular/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibEtc } from '@/core/lib/etc';
import { LibMemoryMng } from '@/core/lib/data_structure/memory_mng';
import { LibLog } from '@/core/lib/dev/log';

export interface UseDebounceMainArgT<T> {
  form: FormGroup;
  formVal: Nullable<Signal<BaseSearchBarFormT<T>>>;
}

@Injectable()
export class UseDebounceHk<T> extends UseInjCtxHk {
  public timerID: TimerIdT = null;
  public prevForm: Nullable<BaseSearchBarFormT<T>> = null;

  private readonly MARGIN_DEBOUNCE: number = 1000;

  public readonly main: (arg: UseDebounceMainArgT<T>) => void = ({
    form: _,
    formVal,
  }: UseDebounceMainArgT<T>) => {
    this.useEffect(() => {
      void formVal?.();

      if (this.timerID) this.timerID = LibEtc.clearTmrID(this.timerID);

      this.timerID = setTimeout(() => {
        const formValNow: Nullable<BaseSearchBarFormT<T>> = formVal?.() ?? null;

        if (LibMemoryMng.isSame(formValNow, this.prevForm)) {
          LibLog.logTtl('same form');
        } else {
          this.prevForm = formValNow;
          LibLog.logTtl('different', this.prevForm);
        }

        this.timerID = LibEtc.clearTmrID(this.timerID);
      }, this.MARGIN_DEBOUNCE);
    });
  };
}
