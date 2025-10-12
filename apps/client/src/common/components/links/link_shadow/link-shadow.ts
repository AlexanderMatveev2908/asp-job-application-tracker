import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppEventMeta, AppEventT } from '../../../types/events';
import { UseAppEventsSvc } from '../../../../core/hooks/use_app_events';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
})
export class LinkShadow {
  private readonly useAppEvents = inject(UseAppEventsSvc);

  public readonly path = input.required<string>();
  public readonly label = input.required<string>();
  public readonly eventT = input.required<AppEventT>();

  public readonly metaEvent = computed((): AppEventMeta => this.useAppEvents.getByT(this.eventT()));

  public readonly boxShadow = computed((): string => {
    const shadows: string[] = [];

    for (let i = 0; i < 4; i++) {
      const blur = 5 + i * 5;
      shadows.push(`0 0 ${blur}px ${this.metaEvent().css}`);
    }

    const res = shadows.join(', ');

    return res;
  });
}
