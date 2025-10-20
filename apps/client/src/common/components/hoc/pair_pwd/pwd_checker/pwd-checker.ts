import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { ConfSwapT } from '@/core/directives/with_swap/etc/types';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { RecCoordsT, UsePortal } from '@/core/hooks/use_portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Portal } from '@/layout/portal/portal';
import { FieldPwdCheckerT, PwdCheckerUiFkt } from './etc/ui_factory';
import { NgComponentOutlet, NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { Reg } from '@/core/paperwork/reg';

@Component({
  selector: 'app-pwd-checker',
  imports: [Portal, NgComponentOutlet, NgClass],
  templateUrl: './pwd-checker.html',
  styleUrl: './pwd-checker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdChecker implements OnInit, AfterViewInit {
  // ? svc
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

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
  private valPwd!: Signal<string>;
  private interactedWith!: Signal<unknown>;
  public pwdLen: Signal<number> = computed(() => this.valPwd()?.trim()?.length ?? 0);
  public readonly showTooltip: Signal<boolean> = computed(
    () => !this.confSwap() || (!!this.confSwap()?.isCurr && this.confSwap()?.mode !== 'swapping')
  );
  public readonly transform: Signal<string> = computed(
    () => `translate(-50%, ${this.isFocused() ? '-150px' : '0px'})`
  );

  // ? listeners & ng lifecycle
  public getSvgCls(reg: RegExp): string {
    if (!this.interactedWith()) return 'text-gray-300';
    else if (reg.test(this.valPwd())) return 'text-green-600';
    else return 'text-red-600';
  }

  public getBorderClr(): string {
    return !this.interactedWith()
      ? 'border-gray-300'
      : Reg.isPwd(this.valPwd())
      ? 'border-green-600'
      : 'border-red-600';
  }

  ngOnInit(): void {
    this.usePlatform.inCtx(() => {
      const ctrl: AbstractControl = this.pwdFieldRef().ctrl();
      this.valPwd = toSignal(ctrl.valueChanges, { initialValue: ctrl.value });
      this.interactedWith = toSignal(
        ctrl.statusChanges.pipe(
          map(() => !!(ctrl.touched || ctrl.dirty)),
          startWith(!!(ctrl.touched || ctrl.dirty))
        ),
        { initialValue: !!(ctrl.touched || ctrl.dirty) }
      );
    });
  }

  ngAfterViewInit(): void {
    this.usePlatform.inCtx(() => {
      effect(() => {
        const conf: ConfSwapT | null = this.confSwap();

        if (!conf || (conf.isCurr && conf.mode !== 'swapping'))
          this.coords.set(UsePortal.coordsOfRef(this.pwdFieldRef().formField));
      });
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(UsePortal.coordsOfRef(this.pwdFieldRef().formField));
  }
  @HostListener('window:resize')
  public onResize(): void {
    this.coords.set(UsePortal.coordsOfRef(this.pwdFieldRef().formField));
  }
}
