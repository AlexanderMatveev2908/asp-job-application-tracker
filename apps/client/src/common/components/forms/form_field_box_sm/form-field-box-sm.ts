import { CheckFieldT } from '@/common/types/forms';
import { UseFieldRoot } from '@/core/directives/form_fields/0.use_field_root';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { SvgFillBoxChecked } from '../../svgs/fill/box_checked/box-checked';
import { NgClass } from '@angular/common';
import { RefDomT } from '@/common/types/etc';
import { FormControl } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';

@Component({
  selector: 'app-form-field-box-sm',
  imports: [NgClass, FormFieldErr],
  templateUrl: './form-field-box-sm.html',
  styleUrl: './form-field-box-sm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxSm extends UseFieldRoot implements OnInit {
  // ? personal props required
  public readonly f: InputSignal<CheckFieldT> = input.required();
  public readonly Svg: Type<unknown> = SvgFillBoxChecked;

  // ? children
  @ViewChild('checkbox') checkbox: RefDomT;

  // ? helpers
  public getTwd(): string {
    if (!this.interacted()) return 'text-gray-300 border-gray-300';
    else if (this.val()) return 'text-green-600 border-green-600';
    else return 'text-red-600 border-red-600';
  }

  public onToggle(): void {
    const c: FormControl = this.ctrl();
    c.markAsDirty();
    c.markAsTouched();
    c.setValue(!this.val());
    c.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.setup(() => {
      effect(() => {
        void this.val();
      });
    });
  }
}
