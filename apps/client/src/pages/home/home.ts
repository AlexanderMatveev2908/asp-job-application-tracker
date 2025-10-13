import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { BtnShadowConfT } from '@/common/components/btns/btn_shadow/etc/types';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { WrapPage } from '@/common/components/wrappers/wrap_page/wrap-page';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public readonly confBtnScript = signal<BtnShadowConfT>({
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
    meta: {
      isDisabled: false,
      isPending: false,
    },
  });
}
