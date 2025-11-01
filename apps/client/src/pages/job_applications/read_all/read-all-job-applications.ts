import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { Observable } from 'rxjs';
import { SearchQueryArgT } from '@/layout/search_layout/search_bar/etc/types';
import { ApplicationsApiSvc } from '@/features/applications/api';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [SearchLayout],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePaginationHk, UseApiTrackerHk],
})
export class ReadAllJobApplications {
  // ? svc
  private readonly applicationsApi: ApplicationsApiSvc = inject(ApplicationsApiSvc);

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

  public readonly strategy: (data: SearchQueryArgT) => Observable<unknown> = (
    data: SearchQueryArgT
  ) => this.useApiTracker.track(this.applicationsApi.get(data));
}
