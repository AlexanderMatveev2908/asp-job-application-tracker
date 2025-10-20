import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { ApiSvc } from '@/core/store/api/api';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';
import { ResApiT } from '@/core/store/api/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
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
  providers: [ApiTrackerSvc],
})
export class Home {
  // ? svc
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly tracker: ApiTrackerSvc = inject(ApiTrackerSvc);

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
        .main(
          this.api.post<ResApiT<void>>(
            ApiArgs.withURL('/test').body({ msg: 'some txt...' }).toastOnFulfilled().pushOnErr()
          )
        )
        .subscribe((res: ResApiT<void>) => {
          void res;
        });
    },
  };
}
