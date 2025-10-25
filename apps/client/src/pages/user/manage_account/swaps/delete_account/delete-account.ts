import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-delete-account',
  imports: [BtnShadow],
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
