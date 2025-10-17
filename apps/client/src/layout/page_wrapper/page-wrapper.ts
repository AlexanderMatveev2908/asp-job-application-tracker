import { SpinPageSsr } from '@/common/components/spins/spin_page_ssr/spin-page-ssr';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  imports: [SpinPageSsr],
  templateUrl: './page-wrapper.html',
  styleUrl: './page-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapper implements AfterViewInit {
  public readonly waitClient: InputSignal<boolean> = input.required();

  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  public readonly isServer: boolean = this.usePlatform.isServer;
  public readonly isHydrated: WritableSignal<boolean> = signal(false);

  ngAfterViewInit(): void {
    this.usePlatform.runOnClientSync(() => {
      this.isHydrated.set(true);
    });
  }
}
