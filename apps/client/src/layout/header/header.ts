import { Component } from '@angular/core';
import { SvgFillGhost } from '../../common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '../../common/components/svgs/stroke/user_write/user-write';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, SvgStrokeUserWrite],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
