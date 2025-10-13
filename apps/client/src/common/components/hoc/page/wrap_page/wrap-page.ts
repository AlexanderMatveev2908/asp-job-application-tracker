import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinPageSsr } from '@/common/components/spins/spin_page_ssr/spin-page-ssr';

@Component({
  selector: 'app-wrap-page',
  imports: [SpinPageSsr],
  templateUrl: './wrap-page.html',
  styleUrl: './wrap-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapPage {}
