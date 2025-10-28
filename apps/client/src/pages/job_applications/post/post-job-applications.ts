import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { JobApplicationForm } from '@/features/applications/etc/forms/job_application/job-application-form';

@Component({
  selector: 'app-post-job-applications',
  imports: [CsrWithTitle, JobApplicationForm],
  templateUrl: './post-job-applications.html',
  styleUrl: './post-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostJobApplications {}
