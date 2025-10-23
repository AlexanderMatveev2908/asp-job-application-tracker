import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { UsePairPwfFormDir } from '@/core/forms/pair_pwd/etc/directories/use_pair_pwd';
import { FormPairPwd } from '@/core/forms/pair_pwd/form-pair-pwd';
import { UseInjCtxSvc } from '@/core/hooks/platform/use_inj_ctx';

@Component({
  selector: 'app-recover-pwd',
  imports: [CsrWithTitle, AuthFormShape, FormPairPwd],
  templateUrl: './recover-pwd.html',
  styleUrl: './recover-pwd.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseInjCtxSvc],
})
export class RecoverPwd extends UsePairPwfFormDir implements OnInit {
  private readonly useInj: UseInjCtxSvc = inject(UseInjCtxSvc);

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      console.log(data);
    });
  };

  ngOnInit(): void {
    this.useInj.useEffect(() => {
      this.useNav.ifPathStartsWith('/auth/recover-pwd', () => {
        if (this.useNav.allowedFrom()) return;

        void this.useNav.replace('/');
      });
    });
  }
}
