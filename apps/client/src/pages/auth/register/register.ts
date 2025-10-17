import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormFieldsSvc } from '@/features/auth/register/ui_factory/form_fields';

@Component({
  selector: 'app-register',
  imports: [CsrWithTitle, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly formFields: RegisterFormFieldsSvc = inject(RegisterFormFieldsSvc);

  public readonly form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  public onSubmit(): void {
    console.log('✅ Submitted form:', this.form.value);
  }
}
