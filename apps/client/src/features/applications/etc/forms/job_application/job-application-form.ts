import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFormMng, ApplicationFormT } from './etc/paperwork/form_mng';
import { TxtFieldT } from '@/common/types/forms';
import { ApplicationFormUiFkt } from './etc/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/forms/form_field/0.use_form_field';
import { UseKitFormHk } from '@/core/hooks/kits/kit_form/0.use_kit_form';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { FormSubmit } from '@/common/components/forms/form_submit/form-submit';
import { UseIDsDir } from '@/core/directives/use_ids';
import { Observable } from 'rxjs';
import { ApplicationStatuses } from './statuses/application-statuses';

@Component({
  selector: 'app-job-application-form',
  imports: [
    FormFieldTxt,
    UseFormFieldDir,
    FormSubmit,
    UseIDsDir,
    ReactiveFormsModule,
    ApplicationStatuses,
  ],
  templateUrl: './job-application-form.html',
  styleUrl: './job-application-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk, UseInjCtxHk],
})
export class JobApplicationForm extends UseKitFormHk {
  public readonly strategy: InputSignal<(data: ApplicationFormT) => Observable<unknown>> =
    input.required();

  public readonly form: FormGroup = ApplicationFormMng.form();
  public txtInputs: TxtFieldT[] = ApplicationFormUiFkt.txtInputs();

  public readonly onSubmit: () => void = () => {
    this.submitForm((data: unknown) => this.strategy()(data as ApplicationFormT));
  };
}
