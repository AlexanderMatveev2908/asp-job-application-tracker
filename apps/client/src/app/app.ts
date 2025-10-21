import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { AuthSlice } from '@/features/auth/slice';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtx implements OnInit, AfterViewInit {
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const jwt: Nullable<string> = this.useStorage.getItem('accessToken');
      if (jwt) this.authSlice.loginOnMount();
    });
  }

  ngAfterViewInit(): void {
    this.useDOM(() => {
      void null;
    });
  }
}
