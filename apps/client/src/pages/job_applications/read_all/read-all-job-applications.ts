import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchApplicationsUiFkt } from '@/features/applications/etc/forms/search_applications/etc/ui_fkt';
import { FormGroup } from '@angular/forms';
import {
  SearchApplicationsFormMng,
  SearchApplicationsFormT,
} from '@/features/applications/etc/forms/search_applications/etc/paperwork/form_mng';
import { UsePaginationHk } from '@/layout/search_layout/search_bar/etc/hooks/use_pagination';
import { SearchLayout } from '@/layout/search_layout/search-layout';
import { SearchBarFilterT, SearchBarSorterT } from '@/layout/search_layout/search_bar/etc/ui_fkt';
import { Observable, tap } from 'rxjs';
import { SearchQueryArgT, SearchQueryResT } from '@/layout/search_layout/search_bar/etc/types';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseApplicationsKitSvc } from '@/features/applications/etc/hooks/use_applications_kit';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { ApplicationT } from '@/features/applications/etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibSearchBar } from '@/layout/search_layout/search_bar/etc/lib';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [SearchLayout],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePaginationHk, UseApiTrackerHk],
})
export class ReadAllJobApplications extends UseInjCtxHk implements OnInit {
  // ? svc
  private readonly applicationsKit: UseApplicationsKitSvc = inject(UseApplicationsKitSvc);

  // ? hooks
  public readonly usePagination: UsePaginationHk = inject(UsePaginationHk);
  public readonly useApiTracker: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? static
  public readonly form: FormGroup = SearchApplicationsFormMng.form();
  public readonly defState: SearchApplicationsFormT = SearchApplicationsFormMng.defState();

  // ? ui & form_fkt
  public readonly txtInputsAvailable: () => TxtFieldArrayT[] = SearchApplicationsUiFkt.txtInputs;
  public readonly filtersAvailable: () => SearchBarFilterT[] = SearchApplicationsUiFkt.filters;
  public readonly sortersAvailable: () => SearchBarSorterT[] = SearchApplicationsUiFkt.sorters;

  private triggerApi(data: SearchQueryArgT): Observable<unknown> {
    return this.useApiTracker.track(
      this.applicationsKit.applicationsApi.get(data).pipe(
        tap({
          next: (res: ResApiT<SearchQueryResT<{ jobApplications: ApplicationT[] }>>) => {
            this.applicationsKit.applicationsSlice.saveApplications(res.jobApplications);
          },
          error: (_: ErrApiT<void>) => {
            this.applicationsKit.applicationsSlice.reset();
          },
        })
      )
    );
  }

  public readonly strategy: (data: SearchQueryArgT) => Observable<unknown> = (
    data: SearchQueryArgT
  ) => this.triggerApi(data);

  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      if (!this.useApiTracker.isPending() && !this.applicationsKit.applicationsSlice.applications())
        this.triggerApi(LibSearchBar.searchDataOf(null)).subscribe();
    });
  }
}
