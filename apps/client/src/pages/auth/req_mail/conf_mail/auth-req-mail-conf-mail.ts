import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { AuthFormShape } from '@/features/auth/components/form_shape/auth-form-shape';
import { TxtFieldT } from '@/common/types/forms';
import { ConfMailUiFkt } from '@/features/auth/pages/req_mail/conf_mail/ui_fkt';
import { FormGroup } from '@angular/forms';
import {
  ConfMailFormMng,
  RequireMailFormT,
} from '@/features/auth/pages/req_mail/conf_mail/paperwork/form_mng';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { from, switchMap, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { NoticeSlice } from '@/features/notice/slice';

@Component({
  selector: 'app-auth-req-mail-conf-mail',
  imports: [CsrWithTitle, AuthFormShape, FormFieldTxt],
  templateUrl: './auth-req-mail-conf-mail.html',
  styleUrl: './auth-req-mail-conf-mail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthReqMailConfMail extends UseKitFormSvc {
  private readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);
  public readonly form: FormGroup = ConfMailFormMng.form;
  public readonly mailField: TxtFieldT = ConfMailUiFkt.mailField;

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => {
      this.track(
        this.requireMailAPi.confMail(data as RequireMailFormT).pipe(
          tap((_: ResApiT<void>) => {
            this.noticeSlice.mailNotice = {
              eventT: 'OK',
              status: 201,
              msg: 'to confirm your account',
            };
          }),
          switchMap((_: ResApiT<void>) => from(this.useNav.replace('/notice', { from: 'ok' })))
        )
      ).subscribe();
    });
  };
}
