import { Directive, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TxtFieldT } from '@/common/types/forms';
import { UseKitFormSvc } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { RequireMailApiSvc } from '@/features/require_mail/api';
import { NoticeSlice } from '@/features/notice/slice';
import { MailFormMng } from '../paperwork/form_mng';
import { MailFormUiFkt } from '../ui_fkt';

@Directive()
export abstract class UseMailFormDir extends UseKitFormSvc {
  protected readonly requireMailAPi: RequireMailApiSvc = inject(RequireMailApiSvc);
  protected readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  public readonly form: FormGroup = MailFormMng.form();
  public readonly mailField: TxtFieldT = MailFormUiFkt.mailField();

  public readonly ctrl: FormControl = this.getCtrl('email');
}
