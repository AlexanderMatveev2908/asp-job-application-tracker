import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { LinkShadowPropsT } from './etc/types';
import { MetaEventDOM } from '@/core/lib/dom/meta_event/meta_event';
import { Span } from '../../els/span/span';
import { AppEventMetaT } from '@/core/lib/dom/meta_event/etc/types';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, Span],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow {
  public readonly props: InputSignal<LinkShadowPropsT> = input.required();
  public readonly padding: InputSignal<Nullable<string>> = input<Nullable<string>>('10px 15px');

  // ? derived
  public readonly metaEvent: Signal<AppEventMetaT> = computed(() =>
    MetaEventDOM.byT(this.props().eventT)
  );
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.props().path)
  );
}
