import { SpanPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';
import { Span } from '@/common/components/els/span/span';
import { SvgFillLogout } from '@/common/components/svgs/fill/logout/logout';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { UseLogout } from '@/features/auth/etc/use_logout';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-side-logout',
  imports: [Span],
  templateUrl: './side-logout.html',
  styleUrl: './side-logout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideLogout extends ApiTrackerSvc {
  private readonly useLogout: UseLogout = inject(UseLogout);

  public readonly spanProps: SpanPropsT = {
    label: 'Logout',
    Svg: SvgFillLogout,
  };
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: '2xl',
  };

  public onLogout(): void {
    this.track(this.useLogout.logout()).subscribe();
  }
}
