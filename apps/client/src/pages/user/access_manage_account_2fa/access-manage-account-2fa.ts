import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Form2fa } from '@/core/forms/2fa/form-2fa';
import { Form2faT } from '@/common/types/etc';
import { Observable, of } from 'rxjs';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-access-manage-account-2fa',
  imports: [Form2fa, UseIDsDir],
  templateUrl: './access-manage-account-2fa.html',
  styleUrl: './access-manage-account-2fa.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessManageAccount2fa {
  public readonly strategy: (data: Form2faT) => Observable<unknown> = (data: Form2faT) => {
    console.log(data);

    return of(data);
  };
}
