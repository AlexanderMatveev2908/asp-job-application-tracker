import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormFieldDynamic } from '@/common/components/forms/dynamic_fields_array/form_field_dynamic/form-field-dynamic';
import { FormControl, FormGroup } from '@angular/forms';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { BaseSearchBarFormT } from '@/core/paperwork/etc/search_bar';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-search-first-row',
  imports: [FormFieldDynamic, UseFormFieldDynamicDir],
  templateUrl: './search-first-row.html',
  styleUrl: './search-first-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFirstRow<T> {
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly formVal: InputSignal<Nullable<BaseSearchBarFormT<T>>> = input.required();

  // ? helpers
  public getTxtCtrl(idx: number): FormControl {
    return this.form().get(`txtInputs.${idx}`) as FormControl;
  }
}
