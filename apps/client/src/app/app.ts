import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EffectCleanupRegisterFn,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { AuthSlice } from '@/features/auth/slice';
import { Nullable } from '@/common/types/etc';
import { UseUserKitSvc } from '@/features/user/etc/use_user_kit';
import { finalize, tap } from 'rxjs';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { ResInfoT } from '@/features/user/etc/types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast, WakeUp],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtx implements OnInit, AfterViewInit {
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const jwt: Nullable<string> = this.useStorage.getItem('accessToken');
      if (jwt) this.authSlice.loginOnMount();
    });

    this.useEffect((_: EffectCleanupRegisterFn) => {
      void this.authSlice.isLogged();

      this.useUserKit.userSlice.setPending(true);
      this.useUserKit.userApi
        .getUser()
        .pipe(
          tap({
            next: (res: ResApiT<ResInfoT>) => {
              if (res?.user) this.useUserKit.userSlice.setUser(res.user);
              else this.useUserKit.userSlice.markNull();
            },
            error: (_: ErrApiT<void>) => {
              this.useUserKit.userSlice.markNull();
            },
          }),
          finalize(() => this.useUserKit.userSlice.setPending(false))
        )
        .subscribe();
    });
  }

  ngAfterViewInit(): void {
    this.useDOM(() => {
      void null;
    });
  }
}
