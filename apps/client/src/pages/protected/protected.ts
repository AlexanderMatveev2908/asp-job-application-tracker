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
import { Nullable } from '@/common/types/etc';
import { from } from 'rxjs';

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

  public readonly fetchingUser: Signal<boolean> = computed(
    () => this.userSlice.userState().isPending
  );

  ngOnInit(): void {
    this.useEffect(() => {
      const path: Nullable<string> = this.useNav.currPath();

      if (path !== '/protected') return;

      if (
        !this.authSlice.isLogged() &&
        !this.authSlice.loggingPending() &&
        this.userSlice.handshake()
      )
        from(this.useNav.replace('/auth/login')).subscribe();
    });
  }
}
