import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  Type,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { RefDomT } from '@/common/types/etc';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormFieldErr, NgComponentOutlet],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt implements OnInit, AfterViewInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal props required
  public readonly ctrl: InputSignal<FormControl<unknown>> = input.required();
  public readonly f: InputSignal<TxtFieldT | TxtSvgFieldT> = input.required();

  // ? personal props optional
  public readonly focusOnMount: InputSignal<boolean> = input(false);
  public readonly onSvgClick: InputSignal<(() => void) | null> = input<(() => void) | null>(null);
  // ? additional listeners for custom needs beside normal ng flow
  // ? rarely used
  public readonly onFocus: InputSignal<((v: string) => void) | null> = input<
    ((v: string) => void) | null
  >(null);
  public readonly onChange: InputSignal<((val: string) => void) | null> = input<
    ((val: string) => void) | null
  >(null);

  // ? children
  @ViewChild('inputTxt') inputTxt!: RefDomT;

  // ? derived
  public readonly Svg: Signal<Type<unknown> | null> = computed(
    () => (this.f() as TxtSvgFieldT)?.Svg ?? null
  );
  public readonly padding: Signal<string> = computed(() =>
    !this.Svg() ? '7.5px 20px' : '7.5px 50px 7.5px 20px'
  );

  public val!: Signal<string>;

  // ? ng lifecycle
  ngOnInit(): void {
    const c = this.ctrl();

    this.usePlatform.inCtx(() => {
      this.val = toSignal(c.valueChanges as Observable<string>, {
        initialValue: c.value as string,
      });
    });
  }

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      if (!this.focusOnMount()) return;
      const el = this.inputTxt?.nativeElement;
      if (!el) return;

      el.focus();
    });
  }
}
