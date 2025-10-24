import { Nullable } from '@/common/types/etc';
import { LibEtc } from '@/core/lib/etc';
import { ShapeCheck } from '@/core/lib/data_structure/shape_check';
import { UseSwapSvc } from '@/core/hooks/use_swap/use_swap';
import { inject, Injectable } from '@angular/core';
import { ZodCheck } from '@/core/paperwork/zod_check';
import { Observable } from 'rxjs';
import { UseKitFormSvc } from './0.use_kit_form';

export interface SubmitSwapArgT {
  fields: string[][];
  cb: (data: unknown) => Observable<unknown>;
}

@Injectable()
export abstract class UseKitSwapFormSvc extends UseKitFormSvc {
  protected readonly useSwap: UseSwapSvc = inject(UseSwapSvc);

  public readonly submitSwapForm: (arg: SubmitSwapArgT) => void = (arg: SubmitSwapArgT) => {
    if (!this.form.valid) {
      ZodCheck.onSubmitFailedInSwap(this.form, (first: string) => {
        const target: Nullable<number> = LibEtc.idxIn(first, arg.fields);

        if (!ShapeCheck.isNone(target)) this.useSwap.setSwapOnErr(target!);
      });

      return;
    }

    this.apiTracker.track(arg.cb(this.form.value)).subscribe();
  };
}
