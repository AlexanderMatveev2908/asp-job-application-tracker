import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { UseSpanDir } from '@/core/directives/use_span';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { BtnListenersT, BtnStatePropsT, Nullable } from '@/common/types/etc';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Setup2faReturnT } from '@/features/user/etc/types';

@Component({
  selector: 'app-content-setup-2fa',
  imports: [UseSpanDir, BtnShadow, UseIDsDir],
  templateUrl: './content-setup-2fa.html',
  styleUrl: './content-setup-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentSetup2fa {
  public readonly resSetup2FA: InputSignal<Nullable<Setup2faReturnT>> = input.required();
  public readonly onClick: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();

  public readonly spanProps: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Setup',
    Svg: null,
  };

  public readonly btnListeners: Signal<BtnListenersT> = computed(() => ({
    onClick: this.onClick(),
  }));
  public readonly btnStateT: Signal<BtnStatePropsT> = computed(() => ({
    isPending: this.isPending(),
    isDisabled: false,
  }));
}
