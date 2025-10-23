import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { Portal } from '@/layout/portal/portal';
import { UseSwapPortalDir } from '@/core/directives/use_portal/1.use_swap_portal';
import { Tooltip } from '@/common/components/els/tooltip/tooltip';
import { PwdGen } from './etc/pwd_gen';
import { CpyPaste } from '../../cpy_paste/cpy-paste';
import { Nullable, SvgT } from '@/common/types/etc';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal, Tooltip, CpyPaste],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseInjCtxSvc],
})
export class PwdGenerator extends UseSwapPortalDir implements AfterViewInit {
  private readonly useInjCtx: UseInjCtxSvc = inject(UseInjCtxSvc);

  // ? static assets
  public readonly Svg: SvgT = SvgFillPwdGen;

  // ? local state
  public readonly pwd: WritableSignal<Nullable<string>> = signal(null);

  // ? listeners
  public genPwd(): void {
    const charsForRange: number = 4;
    this.pwd.set(PwdGen.pwdOf(charsForRange));
  }

  ngAfterViewInit(): void {
    this.useInjCtx.useDOM(() => {
      this.setCoords();
    });

    this.useInjCtx.useEffect(() => {
      if (this.showTooltip()) this.setCoords();
    });
  }
}
