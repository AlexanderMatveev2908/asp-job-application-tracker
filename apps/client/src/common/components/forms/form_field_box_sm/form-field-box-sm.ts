import { CheckFieldT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/form_field/0.use_field_root';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { SvgFillBoxChecked } from '../../svgs/fill/box_checked/box-checked';
import { NgClass } from '@angular/common';
import { Nullable, RefDomT, SvgT } from '@/common/types/etc';
import { FormControl } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { FormFieldBoxAnimations } from './etc/animations';
import { Prs } from '@/core/lib/data_structure/prs';

@Component({
  selector: 'app-form-field-box-sm',
  imports: [NgClass, FormFieldErr],
  templateUrl: './form-field-box-sm.html',
  styleUrl: './form-field-box-sm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxSm extends UseFormFieldDir implements OnInit, AfterViewInit {
  // ? personal props required
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly f: InputSignal<CheckFieldT> = input.required();
  public readonly Svg: SvgT = SvgFillBoxChecked;

  // ? children
  @ViewChild('checkbox') checkbox: RefDomT;
  @ViewChild('mark') mark: RefDomT;

  // ? helpers
  public getTwd(): string {
    if (!this.interacted()) return 'text-gray-300 border-gray-300';
    else if (this.val()) return 'text-green-600 border-green-600';
    else return 'text-red-600 border-red-600';
  }

  // ? props err msg
  public readonly testId: Signal<string> = computed(() => Prs.toSnake(this.f().field));

  // ? listeners
  public onToggle(): void {
    const c: FormControl = this.ctrl();
    c.markAsDirty();
    c.markAsTouched();
    c.setValue(!this.val());
    c.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.setupWithCtrl(this.ctrl());
  }

  ngAfterViewInit(): void {
    this.useEffect(() => {
      const val: Nullable<boolean> = this.val() as Nullable<boolean>;

      FormFieldBoxAnimations.main({
        checkbox: this.checkbox,
        mark: this.mark,
        val,
      });
    });
  }
}
