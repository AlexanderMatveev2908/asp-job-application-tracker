import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wrap-page',
  imports: [],
  templateUrl: './wrap-page.html',
  styleUrl: './wrap-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapPage {}
