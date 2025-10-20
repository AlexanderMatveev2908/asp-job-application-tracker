import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tooltip } from '../../els/tooltip/tooltip';
import { UseFieldErr } from '@/core/directives/form_fields/1.use_field_err';

@Component({
  selector: 'app-form-field-err',
  imports: [Tooltip],
  templateUrl: './form-field-err.html',
  styleUrl: './form-field-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErr extends UseFieldErr {}
