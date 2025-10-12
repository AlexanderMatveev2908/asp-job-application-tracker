import { Component, input } from '@angular/core';
import { AppEventT } from '../../../types/events';

@Component({
  selector: 'app-wrap-events-page',
  imports: [],
  templateUrl: './wrap-events-page.html',
  styleUrl: './wrap-events-page.scss',
})
export class WrapEventsPage {
  public eventT = input.required<AppEventT>();
}
