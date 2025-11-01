import { ApplicationT } from '@/features/applications/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-application-item',
  imports: [],
  templateUrl: './application-item.html',
  styleUrl: './application-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationItem {
  public readonly application: InputSignal<ApplicationT> = input.required();
}
