import { Nullable } from '@/common/types/etc';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { AuthStateT } from '@/features/auth/reducer/reducer';
import { AuthSlice } from '@/features/auth/slice';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuth extends UseInjCtx implements OnInit {
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  ngOnInit(): void {
    this.useEffect(() => {
      const path: Nullable<string> = this.useNav.currPath();
      if (!path || !path.startsWith('/auth')) return;

      const state: AuthStateT = this.authSlice.authState();

      if (state.isLogged && !this.authSlice.loggingPending())
        from(this.useNav.replace('/')).subscribe();
    });
  }
}
