import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-wrap-page-job-applications',
  imports: [RouterOutlet],
  templateUrl: './wrap-page-job-applications.html',
  styleUrl: './wrap-page-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapPageJobApplications {}
