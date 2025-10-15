import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { WrapPage } from '@/common/components/hoc/page/wrap_page/wrap-page';
import { SvgFillBash } from '@/common/components/svgs/fill/bash/bash';
import { BtnEvPropsT, BtnStatePropsT } from '@/common/types/btns';
import { BaseElPropsT } from '@/common/types/els';
import { ApiSvc } from '@/core/store/api/api';
import { ArgsApi } from '@/core/store/api/requests/args_api';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [WrapPage, BtnShadow],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly api: ApiSvc = inject(ApiSvc);

  public readonly btnStateProps: WritableSignal<BtnStatePropsT> = signal({
    isDisabled: false,
    isPending: false,
  });
  public readonly baseElProps: BaseElPropsT = {
    label: 'Script worked 🎉',
    Svg: SvgFillBash,
    eventT: 'INFO',
  };

  public readonly btnEventsProps: BtnEvPropsT = {
    onClick: (): void => {
      const arg = {
        keyA: {
          keyB: {
            keyC: 'final value',
          },
        },
        keyArr: {
          finalArr: ['val arr A', 'val arr B'],
        },
      };

      this.api.get(ArgsApi.withURL('/test').query(arg).toastOnOk()).subscribe((res: object) => {
        void res;
      });
    },
  };
}
