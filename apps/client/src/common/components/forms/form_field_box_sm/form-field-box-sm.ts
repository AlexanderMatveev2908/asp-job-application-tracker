import { CheckFieldT } from '@/common/types/forms';
import { UseFieldRootDir } from '@/core/directives/form_field/0.use_field_root';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SvgFillBoxChecked } from '../../svgs/fill/box_checked/box-checked';
import { NgClass } from '@angular/common';
import { RefDomT, SvgT } from '@/common/types/etc';
import { FormControl } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';
import { FormFieldBoxAnimations } from './etc/animations';

@Component({
  selector: 'app-form-field-box-sm',
  imports: [NgClass, FormFieldErr],
  templateUrl: './form-field-box-sm.html',
  styleUrl: './form-field-box-sm.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxSm extends UseFieldRootDir implements OnInit, AfterViewInit {
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

  // ? listeners
  public onToggle(): void {
    const c: FormControl = this.ctrl();
    c.markAsDirty();
    c.markAsTouched();
    c.setValue(!this.val());
    c.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.setupWithCtrl(this.ctrl(), () => null);
  }

  ngAfterViewInit(): void {
    this.usePlatform.inCtx(() => {
      effect(() => {
        const val: boolean | null = this.val() as boolean | null;

        FormFieldBoxAnimations.main({
          checkbox: this.checkbox,
          mark: this.mark,
          val,
        });
      });
    });
  }
}
