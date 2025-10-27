import { Form2faT } from '@/common/types/etc';
import { CbcHmacSlice } from '@/features/cbcHmac/slice';
import { Directive, inject, input, InputSignal } from '@angular/core';
import { Observable } from 'rxjs';

export type Form2faTestIdT = 'totp' | 'bkp';

@Directive({
  selector: '[appUseForm2faDir]',
})
export class UseForm2faDir {
  // ? props
  public readonly strategy: InputSignal<(data: Form2faT) => Observable<unknown>> = input.required();
  public readonly cbcHmacSlice: CbcHmacSlice = inject(CbcHmacSlice);
  public readonly prefixTestID: InputSignal<string> = input.required();

  public getTestID(t: Form2faTestIdT): string {
    return `${this.prefixTestID()}__swapper__${t}_form`;
  }

  public getSubmitID(t: Form2faTestIdT): string {
    return `${this.getTestID(t)}__submit`;
  }
}
