import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { NoticeSlice } from '@/features/notice/slice';
import { WrapEventsPage } from '@/common/components/hoc/page/wrap_events_page/wrap-events-page';
import { AppEventPayload } from '@/common/types/events';

@Component({
  selector: 'app-notice',
  imports: [WrapEventsPage],
  templateUrl: './notice.html',
  styleUrl: './notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notice {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  public readonly wrapEventsProps: Signal<AppEventPayload> = computed(() => {
    const { cb: _cb, ...rst } = this.noticeSlice.noticeState();

    return rst;
  });
}
