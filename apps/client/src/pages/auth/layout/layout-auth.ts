import { Nullable } from '@/common/types/etc';
import { UseNavSvc } from '@/core/hooks/use_nav';
import { UsePathSvc } from '@/core/hooks/use_path';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { AuthStateT } from '@/features/auth/reducer/reducer';
import { AuthSlice } from '@/features/auth/slice';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuth implements OnInit {
  private readonly authSlice: AuthSlice = inject(AuthSlice);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly usePath: UsePathSvc = inject(UsePathSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  ngOnInit(): void {
    this.usePlatform.inCtx(() => {
      effect(() => {
        const path: Nullable<string> = this.usePath.currPath();
        if (!path || !path.startsWith('/auth')) return;

        const state: AuthStateT = this.authSlice.authState();

        if (state.isLogged && !this.authSlice.loggingPending())
          from(this.useNav.replace('/')).subscribe();
      });
    });
  }
}
