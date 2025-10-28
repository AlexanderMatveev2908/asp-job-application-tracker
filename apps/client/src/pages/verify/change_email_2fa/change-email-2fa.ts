import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { Form2faT } from '@/common/types/etc';
import { Observable, of } from 'rxjs';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseRouteMngHk } from '@/core/hooks/use_route_mng';
import { TokenT } from '@/features/cbcHmac/etc/types';

@Component({
  selector: 'app-change-email-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './change-email-2fa.html',
  styleUrl: './change-email-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseRouteMngHk],
})
export class ChangeEmail2fa implements OnInit {
  private readonly useRouteMng: UseRouteMngHk = inject(UseRouteMngHk);

  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) => {
    console.log(data);

    return of(data);
  };

  ngOnInit(): void {
    this.useRouteMng.pushOutIfNotTokenType('/verify/change-email-2fa', TokenT.CHANGE_EMAIL_2FA);
  }
}
