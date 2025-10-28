import { Nullable } from '@/common/types/etc';
import { CheckBoxFieldT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { ApplicationStatusT } from '@/features/applications/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-box-lg',
  imports: [],
  templateUrl: './form-field-box-lg.html',
  styleUrl: './form-field-box-lg.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBoxLg implements OnInit {
  // ? directives
  public readonly useFormFieldDir: UseFormFieldDir = inject(UseFormFieldDir);

  // ? props
  public readonly f: InputSignal<CheckBoxFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? derived
  public readonly transform: Signal<string> = computed(
    () => `scale(${this.useFormFieldDir.val?.() === this.f().val ? '1.15' : '1'})`
  );
  public readonly transformHover: Signal<string> = computed(
    () => `scale(${this.useFormFieldDir.val?.() === this.f().val ? '1.15' : '1.2'})`
  );

  public onClick(): void {
    const existing: Nullable<ApplicationStatusT> = (this.useFormFieldDir.val?.() ??
      null) as Nullable<ApplicationStatusT>;
    const v: ApplicationStatusT = this.f().val as ApplicationStatusT;

    this.ctrl().setValue(existing === v ? '' : v);
  }

  ngOnInit(): void {
    this.useFormFieldDir.setupWithCtrl(this.ctrl());
  }
}
