import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { WrapPage } from '@/common/components/wrappers/page/wrap_page/wrap-page';
import { BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public readonly btnStateProps = signal<BtnStatePropsT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly baseElProps: BaseElPropsT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly btnEventsProps = {
    onClick: (): void => {
      this.btnStateProps.update((prev) => ({
        ...prev,
        isPending: true,
      }));

      setTimeout(() => {
        this.btnStateProps.update((prev) => ({
          ...prev,
          isPending: false,
        }));
      }, 2000);
    },
  };
}
