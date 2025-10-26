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
import { BtnListenersT, BtnStatePropsT } from '@/common/types/etc';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-content2fa-setup',
  imports: [UseSpanDir, BtnShadow, UseIDsDir],
  templateUrl: './content2fa-setup.html',
  styleUrl: './content2fa-setup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content2faSetup {
  public readonly onClick: InputSignal<() => void> = input.required();
  public readonly isPending: InputSignal<boolean> = input.required();

  public readonly spanProps: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Setup',
    Svg: null,
  };

  public readonly btnListeners: BtnListenersT = {
    onClick: this.onClick,
  };
  public readonly btnStateT: Signal<BtnStatePropsT> = computed(() => ({
    isPending: this.isPending(),
    isDisabled: false,
  }));
}
