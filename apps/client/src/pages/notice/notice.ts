import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WrapPage } from '@/common/components/hoc/page/wrap_page/wrap-page';

@Component({
  selector: 'app-notice',
  imports: [WrapPage, WrapPage],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice {}
