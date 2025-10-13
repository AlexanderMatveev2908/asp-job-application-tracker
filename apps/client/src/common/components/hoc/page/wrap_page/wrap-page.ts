import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { SpinPageSsr } from '@/common/components/spins/spin_page_ssr/spin-page-ssr';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-wrap-page',
  imports: [SpinPageSsr],
  templateUrl: './wrap-page.html',
  styleUrl: './wrap-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapPage {
  public readonly waitClient: InputSignal<boolean> = input.required();

  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  public readonly isServer: boolean = this.usePlatform.isServer;
}
