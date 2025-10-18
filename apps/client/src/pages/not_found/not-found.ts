import { LinkShadowPropsT } from '@/common/components/links/link_shadow/etc/types';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { AppEventPayloadT, AppEventT } from '@/core/hooks/use_event_meta/etc/types';

@Component({
  selector: 'app-not-found',
  imports: [CsrNoticeWrapper, LinkShadow, CsrNoticeWrapper],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  private readonly eventT: AppEventT = 'INFO';

  public readonly wrapEventsProps: AppEventPayloadT = {
    eventT: this.eventT,
    msg: 'The treasure chest is empty. Someone got here before you... 💰',
    status: 404,
  };
  public readonly linkProps: LinkShadowPropsT = {
    path: '/',
    label: 'Home',
    eventT: this.eventT,
    Svg: SvgStrokeHome,
  };
}
