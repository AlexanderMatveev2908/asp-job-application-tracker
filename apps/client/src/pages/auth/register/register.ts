import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  Signal,
  ViewChild,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { RegisterFormFields } from '@/features/auth/register/ui_factory/form_fields';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { Log } from '@/core/lib/log';
import { checkZ } from '@/core/paperwork/zod_check';
import { registerSchema } from '@/features/auth/register/paperwork/schema';
import { BtnStatePropsT, RefDomT, SpanEventPropsT } from '@/common/types/etc';
import { RecCoordsT, UsePortalSvc } from '@/core/hooks/use_portal';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-register',
  imports: [CsrWithTitle, ReactiveFormsModule, FormFieldTxt, BtnShadow],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements AfterViewInit {
  private readonly usePortal: UsePortalSvc = inject(UsePortalSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  public readonly coords: Signal<RecCoordsT | null> = computed(() => this.usePortal.rec());

  public readonly form: FormGroup = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    },
    {
      validators: checkZ(registerSchema),
    }
  );

  @ViewChild('wrapForm') wrapForm!: RefDomT;

  public readonly firstSwapFields: TxtFieldT[] = RegisterFormFields.firstSwap;
  public readonly pairPwdFields: TxtFieldT[] = RegisterFormFields.pwdFields;
  public readonly terms: CheckFieldT = RegisterFormFields.termsField;

  public readonly spanProps: SpanEventPropsT = {
    eventT: 'INFO',
    label: 'Submit',
    Svg: null,
  };
  public readonly btnProps: BtnStatePropsT = {
    isDisabled: false,
    isPending: false,
  };

  public getCtrl(f: TxtFieldT): FormControl {
    return this.form.get(f.name) as FormControl;
  }

  public onSubmit(): void {
    if (this.form.valid) Log.logTtl('form', this.form.value);
    else Log.logTtl('err', this.form.errors);
  }

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      this.usePortal.coordsOf(this.wrapForm);
    });
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.usePortal.coordsOf(this.wrapForm);
  }
}
