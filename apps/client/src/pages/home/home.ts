import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { ApiSvc } from '@/core/store/api/api';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { ResApiT } from '@/core/store/api/etc/types';
import { ApiArgs } from '@/core/store/api/etc/request/args';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { BtnListenersT, BtnStatePropsT } from '@/common/types/etc';
import { SpanEventPropsT, SpanLinkPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillSecurity } from '@/common/components/svgs/fill/security/security';
import { AuthSlice } from '@/features/auth/slice';
import { LinkShadow } from '@/common/components/links/link_shadow/link-shadow';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, BtnShadow, PageWrapper, LinkShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home extends UseApiTrackerHk {
  // ? svc
  private readonly api: ApiSvc = inject(ApiSvc);
  private readonly authSlice: AuthSlice = inject(AuthSlice);

  // ? btn props
  public readonly btnStateProps: Signal<BtnStatePropsT> = computed(() => ({
    isDisabled: false,
    isPending: this.isPending(),
  }));
  public readonly spanProps: SpanEventPropsT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly btnEventsProps: BtnListenersT = {
    onClick: (): void => {
      this.track(
        this.api.post(
          ApiArgs.withURL('/test').body({ msg: 'some txt...' }).toastOnFulfilled().pushOnErr()
        )
      ).subscribe((res: ResApiT<void>) => {
        void res;
      });
    },
  };

  public readonly spanLinkProps: Signal<Omit<SpanLinkPropsT, 'id'>> = computed(() => ({
    label: 'Protected',
    Svg: SvgFillSecurity,
    eventT: this.authSlice.isLogged() ? 'OK' : 'ERR',
    path: '/protected',
  }));
}
