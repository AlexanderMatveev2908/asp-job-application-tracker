import { Component, computed, inject, input } from '@angular/core';
import { PairTxtSvg } from '../../pair_txt_svg/pair-txt-svg';
import { BtnShadowConfT } from './etc/types';
import { UseAppEventsSvc } from '@/core/hooks/use_app_events';

@Component({
  selector: 'app-btn-shadow',
  imports: [PairTxtSvg],
  templateUrl: './btn-shadow.html',
  styleUrl: './btn-shadow.scss',
})
export class BtnShadow {
  private readonly useAppEvents = inject(UseAppEventsSvc);

  public readonly conf = input.required<BtnShadowConfT>();
  public readonly metaEvents = computed(() => this.useAppEvents.getByT(this.conf().eventT));
}
