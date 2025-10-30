import { ChangeDetectionStrategy, Component, input, InputSignal, Type } from '@angular/core';
import { FormFieldDynamic } from '@/common/components/forms/dynamic_fields_array/form_field_dynamic/form-field-dynamic';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { BaseSearchBarFormT } from '@/core/paperwork/etc/search_bar';
import { Nullable } from '@/common/types/etc';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-search-bar-first-row',
  imports: [FormFieldDynamic, UseFormFieldDynamicDir, NgComponentOutlet],
  templateUrl: './search-bar-first-row.html',
  styleUrl: './search-bar-first-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarFirstRow<T> {
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();

  // ? helpers
  public getTxtCtrl(idx: number): FormControl {
    return this.form().get(`txtInputs.${idx}`) as FormControl;
  }

  public readonly removeItem: (idx: number) => void = (idx: number) => {
    const txtInputs: FormArray = this.form().get('txtInputs') as FormArray;
    txtInputs.removeAt(idx);
  };

  // ? static btn assets
  public readonly SvgClose: Type<unknown> = SvgFillClose;
}
