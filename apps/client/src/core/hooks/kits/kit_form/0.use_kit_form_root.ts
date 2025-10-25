import { ZodCheck } from '@/core/paperwork/zod_check';
import { UseKitSideApiSvc } from '@/core/services/use_kit_side_api';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export abstract class UseKitFormRootHk {
  protected abstract readonly getForm: () => FormGroup;

  protected readonly apiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);
  protected readonly useSideApiKit: UseKitSideApiSvc = inject(UseKitSideApiSvc);

  public readonly getCtrl: (name: string) => FormControl = (name: string): FormControl =>
    this.getForm().get(name) as FormControl;

  protected readonly submitForm: (cb: (data: unknown) => Observable<unknown>) => void = (
    cb: (data: unknown) => Observable<unknown>
  ): void => {
    const form = this.getForm();

    if (!form.valid) {
      ZodCheck.onSubmitFailed(form);
      return;
    }

    this.apiTracker.track(cb(form.value)).subscribe();
  };
}
