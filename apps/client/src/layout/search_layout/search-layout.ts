import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '../page_wrapper/page-wrapper';
import { PageCounter } from './page_counter/page-counter';
import { SearchBar } from './search_bar/search-bar';
import { UseSearchbarPropsDir } from './search_bar/etc/directives/use_search_bar_props';

@Component({
  selector: 'app-search-layout',
  imports: [PageWrapper, SearchBar, PageCounter],
  templateUrl: './search-layout.html',
  styleUrl: './search-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLayout<T> extends UseSearchbarPropsDir<T> {}
