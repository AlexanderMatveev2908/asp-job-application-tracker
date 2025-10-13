import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { WrapPage } from '@/common/components/hoc/page/wrap_page/wrap-page';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { BtnEvPropsT, BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
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
      this.btnStateProps.update((prev: BtnStatePropsT) => ({
        ...prev,
        isPending: true,
      }));

      setTimeout(() => {
        this.btnStateProps.update((prev: BtnStatePropsT) => ({
          ...prev,
          isPending: false,
        }));
        // eslint-disable-next-line no-magic-numbers
      }, 2000);
    },
  };
}
