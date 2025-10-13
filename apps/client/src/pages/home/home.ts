import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { WrapPage } from '@/common/components/wrappers/page/wrap_page/wrap-page';
import { BtnStateConfT } from '@/common/types/btns';
import { BaseElConfT } from '@/common/types/els';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public readonly btnStateT = signal<BtnStateConfT>({
    isDisabled: false,
    isPending: false,
  });
  public readonly baseElConfT: BaseElConfT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly confBtnEvents = {
    onClick: (): void => {
      this.btnStateT.update((prev) => ({
        ...prev,
        isPending: true,
      }));

      setTimeout(() => {
        this.btnStateT.update((prev) => ({
          ...prev,
          isPending: false,
        }));
      }, 2000);
    },
  };
}
