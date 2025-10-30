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
import { FormZodMng } from '@/core/paperwork/form_mng/form_zod_mng';
import { SearchBarTxtFieldsRow } from './etc/fragments/txt_fields_row/search-bar-txt-fields-row';
import { SearchBarBtnsRow } from './etc/fragments/btns_row/search-bar-btns-row';
import { LibLog } from '@/core/lib/dev/log';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, SearchBarTxtFieldsRow, SearchBarBtnsRow],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar<T> extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly defState: InputSignal<FormGroup> = input.required();
  public readonly form: InputSignal<FormGroup> = input.required();
  public readonly txtInputsAvailable: InputSignal<TxtFieldArrayT[]> = input.required();

  // ? listeners
  public onSubmit(): void {
    if (!this.form().valid) {
      FormZodMng.onSubmitFailed(this.form());
      return;
    }

    LibLog.logTtl('✅ submit', this.form().value);
  }

  public readonly onErase: () => void = () => this.form().reset(this.defState().getRawValue());

  // ? local state
  public formVal: Nullable<Signal<BaseSearchBarFormT<T>>> = null;

  ngOnInit(): void {
    this.inCtx(() => {
      this.formVal = toSignal(this.form().valueChanges, {
        initialValue: this.form().value,
      });
    });

    this.useEffect(() => {
      console.log(this.formVal?.());
    });
  }
}
