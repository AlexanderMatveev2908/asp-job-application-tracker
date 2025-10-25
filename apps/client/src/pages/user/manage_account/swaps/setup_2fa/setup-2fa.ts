import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-setup-2fa',
  imports: [BtnShadow],
  templateUrl: './setup-2fa.html',
  styleUrl: './setup-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Setup2fa {
  public readonly spanProps: SpanEventPropsT = {
    eventT: 'OK',
    label: 'Setup',
    Svg: null,
  };
}
