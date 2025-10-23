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
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { MetaNav } from '@/core/hooks/use_nav/etc/0.use_path';
import { NavFromT } from '@/core/hooks/use_nav/etc/1.use_router';

@Component({
  selector: 'app-notice',
  imports: [CsrNoticeWrapper, CsrNoticeWrapper],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice extends UseInjCtx implements OnInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly wrapEventsProps: Signal<NoticeWrapperPropsT> = computed(() => {
    const { cb: _cb, ...rst } = this.noticeSlice._noticeState();

    return rst;
  });

  private readonly ALLOWED_FROM: Set<NavFromT> = new Set<NavFromT>([
    'register',
    'error',
    'not_allowed',
    'ok',
  ]);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      const stored: Nullable<NoticeWithoutCb> = this.useStorage.getItem('notice');

      if (stored) this.noticeSlice.notice = stored;
    });

    this.useEffect(() => {
      this.useNav.ifPathStartsWith('/notice', () => {
        const meta: Nullable<MetaNav> = this.useNav.meta();

        if (!meta?.from || !this.ALLOWED_FROM.has(meta.from)) void this.useNav.replace('/');
      });
    });
  }
}
