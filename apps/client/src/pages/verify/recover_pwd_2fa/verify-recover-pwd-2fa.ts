import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Form2faT } from '@/common/types/etc';
import { Observable, of } from 'rxjs';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';

@Component({
  selector: 'app-verify-recover-pwd-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './verify-recover-pwd-2fa.html',
  styleUrl: './verify-recover-pwd-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class VerifyRecoverPwd2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) => {
    console.log(data);

    return of(data);
  };

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/verify/recover-pwd-2fa', TokenT.RECOVER_PWD);
  }
}
