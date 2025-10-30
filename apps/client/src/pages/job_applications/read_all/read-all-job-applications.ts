import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { SearchBar } from '@/layout/search_bar/search-bar';
import { TxtFieldArrayT } from '@/common/types/forms';
import { SearchApplicationsUiFkt } from '@/features/applications/etc/forms/search_applications/etc/ui_fkt';
import { FormGroup } from '@angular/forms';
import {
  SearchApplicationsFormMng,
  SearchApplicationsFormT,
} from '@/features/applications/etc/forms/search_applications/etc/paperwork/form_mng';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [PageWrapper, SearchBar],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadAllJobApplications {
  public readonly txtInputsAvailable: TxtFieldArrayT[] = [
    SearchApplicationsUiFkt.companyName(),
    SearchApplicationsUiFkt.positionName(),
  ];

  public readonly form: FormGroup = SearchApplicationsFormMng.form();
  public readonly defState: SearchApplicationsFormT = SearchApplicationsFormMng.defState();
}
