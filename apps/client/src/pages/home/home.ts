import { Component } from '@angular/core';
import { WrapPage } from '../../common/components/wrappers/wrap_page/wrap-page';

@Component({
  selector: 'app-home',
  imports: [WrapPage],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
