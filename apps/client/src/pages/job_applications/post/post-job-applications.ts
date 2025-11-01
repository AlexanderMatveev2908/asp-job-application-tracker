import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { JobApplicationForm } from '@/features/applications/etc/forms/job_application/job-application-form';
import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import { Observable, tap } from 'rxjs';
import { LibFormPrs } from '@/core/lib/data_structure/form_prs';
import { UseApplicationsKitSvc } from '@/features/applications/etc/hooks/use_applications_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { ApplicationResT } from '@/features/applications/etc/types';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-post-job-applications',
  imports: [CsrWithTitle, JobApplicationForm, UseIDsDir],
  templateUrl: './post-job-applications.html',
  styleUrl: './post-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostJobApplications {
  private readonly useApplicationsKit: UseApplicationsKitSvc = inject(UseApplicationsKitSvc);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly strategy: (data: ApplicationFormT) => Observable<unknown> = (
    data: ApplicationFormT
  ) =>
    this.useApplicationsKit.applicationsApi.post(LibFormPrs.genFormData(data)).pipe(
      tap((_: ResApiT<ApplicationResT>) => {
        this.useApplicationsKit.applicationsSlice.triggerKeyRefresh();
        void this.useNav.replace('/job-applications');
      })
    );
}
