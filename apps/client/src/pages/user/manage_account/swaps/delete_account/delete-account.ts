import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/span/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-delete-account',
  imports: [BtnShadow, UseSpanDir, UseIDsDir],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccount {
  public readonly spanProps: SpanEventPropsT = {
    label: 'Delete',
    Svg: null,
    eventT: 'ERR',
  };
}
