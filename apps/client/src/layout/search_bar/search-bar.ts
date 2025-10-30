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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { SearchBarFirstRow } from './etc/components/first_row/search-bar-first-row';

@Component({
  selector: 'app-search-bar',
  imports: [FormSubmit, UseIDsDir, ReactiveFormsModule, SearchBarFirstRow],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar<T> extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<TxtFieldArrayT[]> = input.required();

  // ? listeners
  public onSubmit(): void {
    if (!this.form().valid) {
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
