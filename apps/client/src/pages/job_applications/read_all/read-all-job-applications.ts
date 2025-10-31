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
import { Observable, of } from 'rxjs';
import { LibLog } from '@/core/lib/dev/log';
import { SearchQueryArgT } from '@/layout/search_layout/search_bar/etc/types';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [SearchLayout],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePaginationHk],
})
export class ReadAllJobApplications {
  // ? hooks
  public readonly usePagination: UsePaginationHk = inject(UsePaginationHk);

  // ? static
  public readonly form: FormGroup = SearchApplicationsFormMng.form();
  public readonly defState: SearchApplicationsFormT = SearchApplicationsFormMng.defState();

  // ? ui & form_fkt
  public readonly txtInputsAvailable: () => TxtFieldArrayT[] = SearchApplicationsUiFkt.txtInputs;
  public readonly filtersAvailable: () => SearchBarFilterT[] = SearchApplicationsUiFkt.filters;
  public readonly sortersAvailable: () => SearchBarSorterT[] = SearchApplicationsUiFkt.sorters;

  public readonly strategy: (data: SearchQueryArgT) => Observable<unknown> = (
    data: SearchQueryArgT
  ) => {
    LibLog.logTtl('api', data);
    return of(data);
  };
}
