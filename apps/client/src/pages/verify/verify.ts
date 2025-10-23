/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { Nullable } from '@/common/types/etc';
import { AadCbcHmacT, TokenT } from '@/common/types/tokens';
import { ErrApp } from '@/core/lib/err';
import { UsePlatformSvc } from '@/core/hooks/platform/use_platform';
import { UseRefSvc } from '@/core/hooks/use_ref';
import { UseCasesVerifyDir } from './etc/1.use_cases';

@Component({
  selector: 'app-verify',
  imports: [PageWrapper],
  templateUrl: './verify.html',
  styleUrl: './verify.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRefSvc],
})
export class Verify extends UseCasesVerifyDir implements OnInit {
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly useRef: UseRefSvc = inject(UseRefSvc);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      if (this.useRef.current) return;
      this.useRef.current = true;

      const cbcHmac: Nullable<string> = this.useNav.query()?.['cbcHmacToken'];

      // ! extractAad also check cbcHmac is a string and not null
      const aad: Nullable<AadCbcHmacT> = this.extractAad(cbcHmac);
      if (!aad) return;

      switch (aad.tokenT) {
        case TokenT.CONF_EMAIL:
          this.confMail(cbcHmac!);
          break;

        case TokenT.RECOVER_PWD:
          this.recoverPwd(cbcHmac!);
          break;

        default:
          throw new ErrApp('bug checking token');
      }
    });
  }
}
