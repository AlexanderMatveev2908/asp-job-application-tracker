import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-login-2fa',
  imports: [Form2fa],
  templateUrl: './login-2fa.html',
  styleUrl: './login-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class Login2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);

  public readonly strategy: (totpOrBkp: string) => Observable<unknown> = (totpOrBkp: string) => {
    console.log(totpOrBkp);

    return EMPTY;
  };

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/auth/login-2fa', TokenT.LOGIN_2FA);
  }
}
