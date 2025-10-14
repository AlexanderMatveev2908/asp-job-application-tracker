import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NoticeSlice } from '@/features/notice/slice';
import { WrapEventsPage } from '@/common/components/hoc/page/wrap_events_page/wrap-events-page';
import { AppEventPayload } from '@/common/types/events';
import { NoticeWithoutCb } from '@/features/notice/reducer/reducer';
import { UseStorageSvc } from '@/core/hooks/use_storage';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-notice',
  imports: [WrapEventsPage],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice implements OnInit {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly wrapEventsProps: Signal<AppEventPayload> = computed(() => {
    const { cb: _cb, ...rst } = this.noticeSlice.noticeState();

    return rst;
  });

  ngOnInit(): void {
    this.usePlatform.runOnClientSync(() => {
      const stored: NoticeWithoutCb | null = this.useStorage.getItem('NOTICE');

      if (stored) this.noticeSlice.noticeWithoutCb = stored;
    });
  }
}
