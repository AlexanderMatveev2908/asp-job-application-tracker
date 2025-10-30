import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormFieldDynamic } from '@/common/components/forms/dynamic_fields_array/form_field_dynamic/form-field-dynamic';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { BaseSearchBarFormT } from '@/core/paperwork/etc/search_bar';
import { Nullable } from '@/common/types/etc';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { UseHoverHk } from '@/core/hooks/listeners/use_hover';
import { UseIDsDir } from '@/core/directives/use_ids';
import { BtnTooltip } from '@/common/components/btns/btn_tooltip/btn-tooltip';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { TxtFieldArrayT } from '@/common/types/forms';
import { UseSpanDir } from '@/core/directives/use_span';

@Component({
  selector: 'app-search-bar-first-row',
  imports: [FormFieldDynamic, UseFormFieldDynamicDir, BtnTooltip, UseIDsDir, UseSpanDir],
  templateUrl: './search-bar-first-row.html',
  styleUrl: './search-bar-first-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk],
})
export class SearchBarFirstRow<T> {
  // ? props
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

  // ? btn tooltip props
  public readonly spanProps: (f: TxtFieldArrayT) => SpanEventPropsT = (
    f: TxtFieldArrayT
  ): SpanEventPropsT => ({
    Svg: SvgFillClose,
    eventT: 'ERR',
    label: `Remove ${f.label}`,
  });
}
