import { SpinPageSsr } from '@/common/components/spins/spin_page_ssr/spin-page-ssr';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
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
export class PageWrapper extends UseInjCtxSvc implements AfterViewInit {
  // ? local state
  public readonly isHydrated: WritableSignal<boolean> = signal(false);

  // ? personal props
  public readonly waitClient: InputSignal<boolean> = input.required();
  public readonly isPending: InputSignal<boolean> = input(false);

  // ? derived
  public readonly isServer: boolean = this.usePlatform.isServer;

  // ? ng lifecycle
  ngAfterViewInit(): void {
    this.usePlatform.onClient(() => {
      this.isHydrated.set(true);
    });
  }
}
