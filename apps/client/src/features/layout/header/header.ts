import { Component } from '@angular/core';
import { SvgGhost } from '../../../common/components/svgs/ghost';

@Component({
  selector: 'app-header',
  imports: [SvgGhost],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
