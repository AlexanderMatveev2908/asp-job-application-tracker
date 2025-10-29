import { Nullable } from '@/common/types/etc';
import { TxtFieldArrayT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { BaseSearchBarFormT } from '@/core/paperwork/etc/search_bar';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormFieldDynamic } from '@/common/components/forms/form_field_dynamic/form-field-dynamic';
import { UseFormFieldDynamicDir } from '@/core/directives/forms/form_field/0.use_form_field_dynamic';
import { FormZodMng } from '@/core/paperwork/form_zod_mng';

@Component({
  selector: 'app-search-bar',
  imports: [FormSubmit, UseIDsDir, ReactiveFormsModule, FormFieldDynamic, UseFormFieldDynamicDir],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar<T> extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<TxtFieldArrayT[]> = input.required();

  // ? helpers
  public getTxtCtrl(idx: number): FormControl {
    return this.form().get(`txtInputs.${idx}`) as FormControl;
  }

  // ? listeners
  public onSubmit(): void {
    if (!this.form().valid) {
      const c: FormControl = this.form().get('txtInputs.0') as FormControl;
      c.markAsDirty();
      c.markAsTouched();
      c.updateValueAndValidity();

      FormZodMng.onSubmitFailed(this.form());
      return;
    }

    console.log('success');
    console.log(this.form().value);
  }

  // ? local state
  public formVal: Nullable<Signal<BaseSearchBarFormT<T>>> = null;

  ngOnInit(): void {
    this.inCtx(() => {
      this.formVal = toSignal(this.form().valueChanges, {
        initialValue: this.form().value,
      });
    });
  }
}
