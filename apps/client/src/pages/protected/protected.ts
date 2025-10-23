import { AuthSlice } from '@/features/auth/slice';
import { UserSlice } from '@/features/user/slice';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { TestApiSvc } from '@/features/test/api';

@Component({
  selector: 'app-protected',
  imports: [PageWrapper],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Protected extends UseInjCtx implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly userSlice: UserSlice = inject(UserSlice);
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly testApi: TestApiSvc = inject(TestApiSvc);

  public readonly fetchingUser: Signal<boolean> = computed(
    () => this.userSlice.userState().isPending
  );

  ngOnInit(): void {
    this.testApi.protectedData().subscribe();

    this.useEffect(() => {
      this.useNav.ifPathStartsWith('/protected', () => {
        if (
          this.authSlice.isLogged() ||
          this.authSlice.authState().loggingIn ||
          !this.userSlice.handshake()
        )
          return;

        void this.useNav.replace('/auth/login');
      });
    });
  }
}
