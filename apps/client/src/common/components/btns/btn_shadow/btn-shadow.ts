import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnShadow {
  private readonly useAppEvents: UseAppEvSvc = inject(UseAppEvSvc);

  public readonly baseProps: InputSignal<BaseElPropsT> = input.required();
  public readonly btnProps: InputSignal<BtnStatePropsT> = input.required();
  public readonly eventsProps: InputSignal<BtnEvPropsT> = input.required();

  public readonly pairTxtProps: Signal<PairTxtSvgPropsT> = computed(() => ({
    label: this.baseProps().label,
    Svg: this.baseProps().Svg,
  }));

  public readonly metaEvents: Signal<AppEvMeta> = computed(() =>
    this.useAppEvents.getByT(this.baseProps().eventT)
  );

  public readonly wrapBtnApiProps: Signal<WrapBtnApiPropsT> = computed(() => ({
    eventT: this.baseProps().eventT,
    isPending: this.btnProps().isPending,
  }));
}
