import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-application-statuses',
  imports: [],
  templateUrl: './application-statuses.html',
  styleUrl: './application-statuses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationStatuses {
  public readonly label: InputSignal<string> = input.required();
}
