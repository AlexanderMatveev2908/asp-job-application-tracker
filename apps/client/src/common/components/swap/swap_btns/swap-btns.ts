import { BtnStatePropsT, SpanEventPropsT, WithIdT } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnShadow } from '../../btns/btn_shadow/btn-shadow';
import { SpansSwap } from './etc/spans';

@Component({
  selector: 'app-swap-btns',
  imports: [BtnShadow],
  templateUrl: './swap-btns.html',
  styleUrl: './swap-btns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwapBtns {
  public btnStateProps: BtnStatePropsT = {
    isDisabled: false,
    isPending: false,
  };

  public readonly spans: (SpanEventPropsT & WithIdT)[] = SpansSwap.getSpansProps();
}
