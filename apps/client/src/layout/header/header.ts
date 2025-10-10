import { Component } from '@angular/core';
import { SvgGhost } from '../../common/components/svgs/ghost';
import { SvgUserWrite } from '../../common/components/svgs/user-write';

@Component({
  selector: 'app-header',
  imports: [SvgGhost, SvgUserWrite],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
