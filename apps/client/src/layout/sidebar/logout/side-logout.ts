import { SpanPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';
import { Span } from '@/common/components/els/span/span';
import { SvgFillLogout } from '@/common/components/svgs/fill/logout/logout';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-side-logout',
  imports: [Span],
  templateUrl: './side-logout.html',
  styleUrl: './side-logout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideLogout {
  public readonly spanProps: SpanPropsT = {
    label: 'Logout',
    Svg: SvgFillLogout,
  };
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: '2xl',
  };
}
