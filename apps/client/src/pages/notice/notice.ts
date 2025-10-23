import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NoticeSlice } from '@/features/notice/slice';
import { NoticeWithoutCb } from '@/features/notice/reducer/reducer';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { Nullable } from '@/common/types/etc';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';

@Component({
  selector: 'app-notice',
  imports: [CsrNoticeWrapper, CsrNoticeWrapper],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice extends UseInjCtxSvc implements OnInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly wrapEventsProps: Signal<NoticeWrapperPropsT> = computed(() => {
    const { cb: _cb, ...rst } = this.noticeSlice._noticeState();

    return rst;
  });

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const stored: Nullable<NoticeWithoutCb> = this.useStorage.getItem('notice');

      if (stored) this.noticeSlice.notice = stored;
    });

    this.useEffect(() => {
      this.useNav.ifPathStartsWith('/notice', () => {
        if (this.useNav.allowedFrom()) return;

        void this.useNav.replace('/');
      });
    });
  }
}
