import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { WrapPage } from '@/common/components/hoc/page/wrap_page/wrap-page';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { BtnEvPropsT, BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { ToastSlice } from '@/features/toast/slice';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly toastSlice: ToastSlice = inject(ToastSlice);

  public readonly btnStateProps: WritableSignal<BtnStatePropsT> = signal({
    isDisabled: false,
    isPending: false,
  });
  public readonly baseElProps: BaseElPropsT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly btnEventsProps: BtnEvPropsT = {
    onClick: (): void => {
      this.toastSlice.openToast({
        eventT: 'WARN',
        msg: 'some warn msg',
        status: 0,
      });
    },
  };
}
