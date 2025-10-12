import { Component } from '@angular/core';
import { WrapEventsPage } from '../../common/components/wrappers/wrap_events_page/wrap-events-page';
import { LinkShadow } from '../../common/components/links/link_shadow/link-shadow';

@Component({
  selector: 'app-not-found',
  imports: [WrapEventsPage, LinkShadow],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
