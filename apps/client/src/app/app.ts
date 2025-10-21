import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import { ChangeDetectionStrategy, Component, effect, EffectRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtx {
  public eft: EffectRef = effect(() => {
    this.useDOM(() => {
      void null;
    });
  });
}
