import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { SearchBar } from '@/layout/search_bar/search-bar';

@Component({
  selector: 'app-read-all-job-applications',
  imports: [PageWrapper, SearchBar],
  templateUrl: './read-all-job-applications.html',
  styleUrl: './read-all-job-applications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadAllJobApplications {}
