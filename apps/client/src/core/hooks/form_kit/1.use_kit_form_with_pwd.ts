import { Injectable, signal, WritableSignal } from '@angular/core';
import { UseKitFormSvc } from './0.use_kit_form';

@Injectable()
export abstract class UseKitFormWithPwdSvc extends UseKitFormSvc {
  public readonly isPwdTypePwd: WritableSignal<boolean> = signal(true);

  public onToggle: () => void = () => {
    this.isPwdTypePwd.set(!this.isPwdTypePwd());
  };
}
