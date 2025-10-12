import { Component } from '@angular/core';
import { WrapEventsPage } from '../../common/components/wrappers/wrap_events_page/wrap-events-page';

@Component({
  selector: 'app-not-found',
  imports: [WrapEventsPage],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {}
