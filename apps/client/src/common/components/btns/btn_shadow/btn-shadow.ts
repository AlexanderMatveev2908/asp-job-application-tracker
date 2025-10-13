import { Component, computed, inject, input } from '@angular/core';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { AppEvMeta } from '@/common/types/events';
import { WrapBtnApiConfT } from '../../wrappers/btns/wrap_btn_api/etc/types';
import { WrapBtnApi } from '../../wrappers/btns/wrap_btn_api/wrap-btn-api';
import { PairTxtSvg } from '../../pair_txt_svg/pair-txt-svg';
import { BtnEvConfT, BtnStateConfT } from '@/common/types/btns';
import { BaseElConfT } from '@/common/types/els';
import { PairTxtSvgConfT } from '../../pair_txt_svg/etc/types';

@Component({
  selector: 'app-btn-shadow',
  imports: [PairTxtSvg, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
})
export class BtnShadow {
  private readonly useAppEvents = inject(UseAppEvSvc);

  public readonly baseConf = input.required<BaseElConfT>();
  public readonly confBtn = input.required<BtnStateConfT>();
  public readonly confEvents = input.required<BtnEvConfT>();

  public readonly confPairTxt = computed<PairTxtSvgConfT>(() => ({
    label: this.baseConf().label,
    Svg: this.baseConf().Svg,
  }));

  public readonly metaEvents = computed<AppEvMeta>(() =>
    this.useAppEvents.getByT(this.baseConf().eventT)
  );

  public readonly wrapBtnApiConf = computed<WrapBtnApiConfT>(() => ({
    eventT: this.baseConf().eventT,
    isPending: this.confBtn().isPending,
  }));
}
