import { TxtFieldT, TxtSvgFieldT } from '@/common/types/forms';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
  Type,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { OptCb } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { UseFormField } from '@/core/directives/form_fields/1.use_form_field';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormFieldErr, NgComponentOutlet],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseFormField implements OnInit {
  // ? personal props required
  public readonly f: InputSignal<TxtFieldT | TxtSvgFieldT> = input.required();

  // ? personal props optional
  public readonly onSvgClick: InputSignal<(() => void) | null> = input<(() => void) | null>(null);
  // ? additional listeners for custom needs beside normal ng flow
  // ? rarely used
  public readonly onFocus: InputSignal<OptCb> = input<OptCb>(null);
  public readonly onBlur: InputSignal<OptCb> = input<OptCb>(null);
  public readonly onChange: InputSignal<OptCb> = input<OptCb>(null);

  // ? derived
  public readonly Svg: Signal<Type<unknown> | null> = computed(
    () => (this.f() as TxtSvgFieldT)?.Svg ?? null
  );
  public readonly padding: Signal<string> = computed(() =>
    !this.Svg() ? '7.5px 20px' : '7.5px 50px 7.5px 20px'
  );

  // ? ng lifecycle
  ngOnInit(): void {
    this.setup(() => null);
  }
}
