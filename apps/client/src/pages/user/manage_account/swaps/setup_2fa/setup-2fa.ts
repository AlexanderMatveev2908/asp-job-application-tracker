import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-setup-2fa',
  imports: [BtnShadow, UseSpanDir, UseIDsDir],
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
