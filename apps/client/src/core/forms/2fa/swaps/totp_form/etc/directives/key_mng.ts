import { Directive, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TotpFormUiFkt } from '../ui_fkt';
import { FocusDOM } from '@/core/lib/dom/focus';
import { LibTotpFormMeta } from '../lib/metadata';

export interface SwitchKeyArgT {
  form: FormGroup;
  getCtrl: (name: string) => FormControl;
  key: string;
  val: string[];
}

@Directive()
export class UseTotpFormKeysHk {
  public readonly comboKey: WritableSignal<string[]> = signal([]);
  public readonly selectAll: WritableSignal<boolean> = signal(false);

  private resetKeyTrack(): void {
    this.selectAll.set(false);
    this.comboKey.set([]);
  }

  private handleDelete(form: FormGroup, ctrl: FormControl, currIdx: number): void {
    if (this.selectAll()) {
      form.setValue({
        totp: Array.from({ length: TotpFormUiFkt.nFields }, () => ''),
      });
      FocusDOM.byDataField('totp.0');

      this.resetKeyTrack();
      return;
    }

    this.resetKeyTrack();
    ctrl.setValue('');
    FocusDOM.byDataField(`totp.${currIdx - 1}`);
  }

  public switchKey({ form, getCtrl, val, key }: SwitchKeyArgT): void {
    const { currTotp, currIdx, allIn } = LibTotpFormMeta.main(val);

    // ! allIn check all value are:
    // ! number i where expected or truthy for DOM/strings
    if (!allIn) return;

    const ctrl: FormControl = getCtrl(currTotp!);

    switch (key) {
      case 'Backspace':
        this.handleDelete(form, ctrl, currIdx!);
        break;

      case 'Control':
        this.comboKey.set(['Control']);
        break;

      case 'a':
        if (this.comboKey().includes('Control')) this.selectAll.set(true);

        this.comboKey.set([]);
        break;

      default:
        this.resetKeyTrack();
    }
  }
}
