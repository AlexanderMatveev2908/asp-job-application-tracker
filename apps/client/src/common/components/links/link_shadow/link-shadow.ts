import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { LinkShadowConfT } from './etc/types';
import { AppEventMeta } from '@/common/types/events';
import { UseAppEventsSvc } from '@/core/hooks/use_app_events';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgComponentOutlet],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
})
export class LinkShadow {
  private readonly useAppEvents = inject(UseAppEventsSvc);

  public readonly conf = input.required<LinkShadowConfT>();

  public readonly metaEvent = computed(
    (): AppEventMeta => this.useAppEvents.getByT(this.conf().eventT)
  );
}
