import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { LinkShadowPropsT } from './etc/types';
import { AppEvMeta } from '@/common/types/events';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { PairTxtSvg } from '../../pair_txt_svg/pair-txt-svg';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, PairTxtSvg],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
})
export class LinkShadow {
  private readonly useAppEvents = inject(UseAppEvSvc);

  public readonly props = input.required<LinkShadowPropsT>();

  public readonly metaEvent = computed<AppEvMeta>(() =>
    this.useAppEvents.getByT(this.props().eventT)
  );
  public readonly isExternal = computed<boolean>(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.props().path)
  );
}
