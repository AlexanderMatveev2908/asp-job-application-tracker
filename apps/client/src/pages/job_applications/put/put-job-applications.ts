import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CsrWithTitle } from '@/common/components/hoc/page/csr_with_title/csr-with-title';
import { JobApplicationForm } from '@/features/applications/etc/forms/job_application/job-application-form';
import { UseIDsDir } from '@/core/directives/use_ids';
import { ApplicationFormT } from '@/features/applications/etc/forms/job_application/etc/paperwork/form_mng';
import { Observable, tap } from 'rxjs';
import { UseNavSvc } from '@/core/services/use_nav/use_nav';
import { Nullable } from '@/common/types/etc';
import { Reg } from '@/core/paperwork/reg';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { ApplicationResT, ApplicationT } from '@/features/applications/etc/types';
import { ApplicationsApiSvc } from '@/features/applications/api';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { ErrApp } from '@/core/lib/err';
import { LibFormPrs } from '@/core/lib/data_structure/form_prs';

@Component({
  selector: 'app-put-job-applications',
  imports: [CsrWithTitle, JobApplicationForm, UseIDsDir],
  templateUrl: './put-job-applications.html',
  styleUrl: './put-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseInjCtxHk, UseApiTrackerHk],
})
export class PutJobApplications implements OnInit {
  // ? hooks
  private readonly useInjCtx: UseInjCtxHk = inject(UseInjCtxHk);

  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? svc
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly applicationsApi: ApplicationsApiSvc = inject(ApplicationsApiSvc);

  // ? local state
  public readonly currApplication: WritableSignal<Nullable<ApplicationT>> = signal(null);

  // ? listeners

  private setApplication(applicationID: string): Observable<unknown> {
    return this.applicationsApi.getByID(applicationID).pipe(
      tap((res: ResApiT<ApplicationResT>) => {
        this.currApplication.set(res.jobApplication);
      })
    );
  }

  public readonly strategy: (data: ApplicationFormT) => Observable<unknown> = (
    data: ApplicationFormT
  ) => {
    const applicationID: Nullable<string> = this.useNav.path_variables()?.['applicationID'];
    if (!applicationID) throw new ErrApp('bug => user supposed to be pushed out');

    return this.applicationsApi.put(applicationID, LibFormPrs.genFormData(data)).pipe(
      tap((_: ResApiT<ApplicationResT>) => {
        void this.useNav.replace('/job-applications');
      })
    );
  };

  ngOnInit(): void {
    this.useInjCtx.usePlatform.onClient(() => {
      const applicationID: Nullable<string> = this.useNav.path_variables()?.['applicationID'];

      if (!Reg.isUUID(applicationID)) {
        void this.useNav.replace('/');
        return;
      }

      this.useApiTracker.track(this.setApplication(applicationID!)).subscribe();
    });
  }
}
