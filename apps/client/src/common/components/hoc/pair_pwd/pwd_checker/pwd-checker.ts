import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { ConfSwapT } from '@/core/directives/use_swap/etc/types';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { FieldPwdCheckerT, PwdCheckerUiFkt } from './etc/ui_fkt';
import { NgComponentOutlet, NgClass } from '@angular/common';
import { Reg } from '@/core/paperwork/reg';
import { UseFieldRootDir } from '@/core/directives/form_field/0.use_field_root';
import { PortalDOM, RecCoordsT } from '@/core/lib/dom/portal';

@Component({
  selector: 'app-pwd-checker',
  imports: [Portal, NgComponentOutlet, NgClass],
  templateUrl: './pwd-checker.html',
  styleUrl: './pwd-checker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdChecker extends UseFieldRootDir implements OnInit, AfterViewInit {
  // ? personal props
  public readonly isFocused: InputSignal<boolean> = input.required();
  public readonly pwdFieldRef: InputSignal<FormFieldTxt> = input.required();
  public readonly confSwap: InputSignal<ConfSwapT | null> = input<ConfSwapT | null>(null);

  // ? static assets
  public readonly fieldsCheckers: FieldPwdCheckerT[] = PwdCheckerUiFkt.fields;
  public readonly pwdRuler: Omit<FieldPwdCheckerT, 'id'> = PwdCheckerUiFkt.ruler;

  // ? local state
  public readonly coords: WritableSignal<RecCoordsT | null> = signal<RecCoordsT | null>(null);

  // ? derived
  public pwdLen: Signal<number> = computed(() => (this.val() as string)?.trim()?.length ?? 0);
  public readonly showTooltip: Signal<boolean> = computed(
    () => !this.confSwap() || (!!this.confSwap()?.isCurr && this.confSwap()?.mode !== 'swapping')
  );
  public readonly transform: Signal<string> = computed(
    () => `translate(-50%, ${this.isFocused() ? '-150px' : '0px'})`
  );

  // ? listeners & ng lifecycle
  public getSvgCls(reg: RegExp): string {
    if (!this.interacted()) return 'text-gray-300';
    else if (reg.test(this.val() as string)) return 'text-green-600';
    else return 'text-red-600';
  }

  public getBorderClr(): string {
    return !this.interacted()
      ? 'border-gray-300'
      : Reg.isPwd(this.val() as string)
      ? 'border-green-600'
      : 'border-red-600';
  }

  ngOnInit(): void {
    this.setupWithFieldRef(this.pwdFieldRef(), () => null);
  }

  ngAfterViewInit(): void {
    this.usePlatform.inCtx(() => {
      effect(() => {
        const conf: ConfSwapT | null = this.confSwap();

        if (!conf || (conf.isCurr && conf.mode !== 'swapping'))
          this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
      });
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.coords.set(PortalDOM.coordsOfRef(this.pwdFieldRef().formField));
  }
}
