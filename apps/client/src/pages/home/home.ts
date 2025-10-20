import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { ApiSvc } from '@/core/store/api/api';
import { TrackerSvc } from '@/core/store/api/etc/tracker';
import { ResApiT } from '@/core/store/api/etc/types';
import { ArgsApi } from '@/core/store/api/etc/request/args_api';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { BtnListenersT, BtnStatePropsT } from '@/common/types/etc';
import { SpanEventPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, BtnShadow, PageWrapper],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TrackerSvc],
})
export class Home {
  // ? svc
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly tracker: TrackerSvc = inject(TrackerSvc);

  // ? btn props
  public readonly btnStateProps: Signal<BtnStatePropsT> = computed(() => ({
    isDisabled: false,
    isPending: this.tracker.isPending(),
  }));
  public readonly spanProps: SpanEventPropsT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly btnEventsProps: BtnListenersT = {
    onClick: (): void => {
      this.tracker
        .trackPending(
          this.api.post<ResApiT<void>>(
            ArgsApi.withURL('/test').body({ msg: 'some txt...' }).toastOnFulfilled().pushOnErr()
          )
        )
        .subscribe((res: ResApiT<void>) => {
          void res;
        });
    },
  };
}
