import { FormShape } from '@/common/components/forms/form_shape/form-shape';
import { UseFormShapeDir } from '@/core/directives/forms/use_form_shape';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthSpanLinks } from '../span_links/auth-span-links';

@Component({
  selector: 'app-auth-form-shape',
  imports: [FormShape, AuthSpanLinks, UseFormShapeDir],
  templateUrl: './auth-form-shape.html',
  styleUrl: './auth-form-shape.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormShape extends UseFormShapeDir {}
