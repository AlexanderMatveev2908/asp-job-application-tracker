import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '../../els/span/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';
import { BtnStatePropsT } from '@/common/types/etc';

@Component({
  selector: 'app-form-submit',
  imports: [BtnShadow],
  templateUrl: './form-submit.html',
  styleUrl: './form-submit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubmit {
  public readonly isPending: InputSignal<boolean> = input.required();
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);

  // ? span of btn props • static
  public readonly spanProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Submit',
    Svg: null,
  };

  // ? dynamic state change
  public btnProps: Signal<BtnStatePropsT> = computed(() => ({
    isDisabled: false,
    isPending: this.isPending(),
  }));

  // ? playwright stuff
  public derivedSubmitId: Signal<string> = computed(() => this.useIDsDir.testId() + '__submit');
}
