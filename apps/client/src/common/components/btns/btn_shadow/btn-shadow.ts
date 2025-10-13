import { Component, computed, inject, input } from '@angular/core';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { AppEvMeta } from '@/common/types/events';
import { WrapBtnApiPropsT } from '../../wrappers/btns/wrap_btn_api/etc/types';
import { WrapBtnApi } from '../../wrappers/btns/wrap_btn_api/wrap-btn-api';
import { PairTxtSvg } from '../../pair_txt_svg/pair-txt-svg';
import { BtnEvPropsT, BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { PairTxtSvgPropsT } from '../../pair_txt_svg/etc/types';

@Component({
  selector: 'app-btn-shadow',
  imports: [PairTxtSvg, WrapBtnApi],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
})
export class BtnShadow {
  private readonly useAppEvents = inject(UseAppEvSvc);

  public readonly baseProps = input.required<BaseElPropsT>();
  public readonly btnProps = input.required<BtnStatePropsT>();
  public readonly eventsProps = input.required<BtnEvPropsT>();

  public readonly pairTxtProps = computed<PairTxtSvgPropsT>(() => ({
    label: this.baseProps().label,
    Svg: this.baseProps().Svg,
  }));

  public readonly metaEvents = computed<AppEvMeta>(() =>
    this.useAppEvents.getByT(this.baseProps().eventT)
  );

  public readonly wrapBtnApiProps = computed<WrapBtnApiPropsT>(() => ({
    eventT: this.baseProps().eventT,
    isPending: this.btnProps().isPending,
  }));
}
