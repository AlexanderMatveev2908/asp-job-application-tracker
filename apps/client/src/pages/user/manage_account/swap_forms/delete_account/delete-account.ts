import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import { UseSpanDir } from '@/core/directives/use_span';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseKitPopHk } from '@/core/hooks/kits/use_kit_pop';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { Popup } from '@/layout/popup/popup';
import { Portal } from '@/layout/portal/portal';
import { UsePortalDir } from '@/core/directives/use_portal/0.use_portal';
import { BtnPopChoicePropsT, PopChoices } from '@/common/components/hoc/pop_choices/pop-choices';
import { v4 } from 'uuid';

@Component({
  selector: 'app-delete-account',
  imports: [BtnShadow, UseSpanDir, UseIDsDir, Popup, Portal, PopChoices],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseKitPopHk],
})
export class DeleteAccount extends UsePortalDir {
  public readonly useKitPop: UseKitPopHk = inject(UseKitPopHk);

  public onBtnCLick: () => void = () => {
    this.useKitPop.isPop.set(true);
  };

  // ? popup props
  public readonly popupStaticProps: PopupStaticPropsT = {
    cls: 'del_acc',
    closeOnMouseOut: true,
    eventT: 'ERR',
    closePop: this.useKitPop.closePop,
  };

  // ? btn props
  public readonly spanProps: SpanEventPropsT = {
    label: 'Delete',
    Svg: null,
    eventT: 'ERR',
  };

  // ? pop choices props
  public readonly popChoiceA: BtnPopChoicePropsT = { label: 'Delete', isPending: false, id: v4() };
  public readonly popChoiceB: BtnPopChoicePropsT = {
    label: 'Change idea',
    isPending: false,
    id: v4(),
  };
}
