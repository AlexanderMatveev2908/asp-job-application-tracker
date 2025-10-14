import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { WrapPage } from '@/common/components/hoc/page/wrap_page/wrap-page';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { BtnEvPropsT, BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { UseNavSvc } from '@/core/hooks/use_nav';
import { NoticeSlice } from '@/features/notice/slice';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

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
    onClick: async (): Promise<void> => {
      this.noticeSlice.noticeState = {
        eventT: 'WARN',
        msg: 'some warn msg',
        status: 0,
      };

      await this.useNav.navTo('/notice');
    },
  };
}
