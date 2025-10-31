import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { SearchBar } from '@/layout/search_bar/search-bar';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchApplicationsUiFkt } from '@/features/applications/etc/forms/search_applications/etc/ui_fkt';
import { FormGroup } from '@angular/forms';
import {
  SearchApplicationsFormMng,
  SearchApplicationsFormT,
} from '@/features/applications/etc/forms/search_applications/etc/paperwork/form_mng';
import { SearchBarFilterT, SearchBarSorterT } from '@/layout/search_bar/etc/ui_fkt';
import { PageCounter } from '@/layout/page_counter/page-counter';
import { UsePaginationHk } from '@/core/hooks/use_pagination';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [PageWrapper, SearchBar, PageCounter],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePaginationHk],
})
export class ReadAllJobApplications {
  // ? hooks
  public readonly usePagination: UsePaginationHk = inject(UsePaginationHk);

  public readonly form: FormGroup = SearchApplicationsFormMng.form();
  public readonly defState: SearchApplicationsFormT = SearchApplicationsFormMng.defState();

  // ? ui & form_fkt
  public readonly txtInputsAvailable: () => TxtFieldArrayT[] = SearchApplicationsUiFkt.txtInputs;
  public readonly filtersAvailable: () => SearchBarFilterT[] = SearchApplicationsUiFkt.filters;
  public readonly sortersAvailable: () => SearchBarSorterT[] = SearchApplicationsUiFkt.sorters;
}
