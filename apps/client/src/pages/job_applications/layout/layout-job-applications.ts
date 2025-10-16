import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-job-applications',
  imports: [RouterOutlet],
  templateUrl: './layout-job-applications.html',
  styleUrl: './layout-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutJobApplications {}
