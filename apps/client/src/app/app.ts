import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import { ChangeDetectionStrategy, Component, effect, EffectRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public eft: EffectRef = effect(() => {
    this.usePlatform.whenDomPainted(() => {
      void null;
    });
  });
}
