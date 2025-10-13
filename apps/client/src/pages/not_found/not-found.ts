import { LinkShadowConfT } from '@/common/components/links/link_shadow/etc/types';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';
import { WrapEventsConfT } from '@/common/components/wrappers/wrap_events_page/etc/types';
import { WrapEventsPage } from '@/common/components/wrappers/wrap_events_page/wrap-events-page';
import { AppEventT } from '@/common/types/events';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [WrapEventsPage, LinkShadow],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  private readonly eventT: AppEventT = 'INFO';

  public readonly wrapEventsConf: WrapEventsConfT = {
    eventT: this.eventT,
    msg: 'The treasure chest is empty. Someone got here before you... 💰',
    status: 404,
  };
  public readonly linkConf: LinkShadowConfT = {
    path: '/',
    label: 'Home',
    eventT: this.eventT,
    Svg: SvgStrokeHome,
  };
}
