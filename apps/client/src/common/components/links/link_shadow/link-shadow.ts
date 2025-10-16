import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { LinkShadowPropsT } from './etc/types';
import { AppEventMeta } from '@/common/types/events';
import { UseAppEvSvc } from '@/core/hooks/use_app_ev';
import { PairTxtSvg } from '../../els/span/pair-txt-svg';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, PairTxtSvg],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow {
  private readonly useAppEvents: UseAppEvSvc = inject(UseAppEvSvc);

  public readonly props: InputSignal<LinkShadowPropsT> = input.required();

  public readonly metaEvent: Signal<AppEventMeta> = computed(() =>
    this.useAppEvents.getByT(this.props().eventT)
  );
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.props().path)
  );
}
