import { Component } from '@angular/core';
import { SvgFillGhost } from '../../common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '../../common/components/svgs/stroke/user_write/user-write';
import { RouterLink } from '@angular/router';
import { SvgStrokeBurger } from '../../common/components/svgs/stroke/burger/burger';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, SvgStrokeUserWrite, RouterLink, SvgStrokeBurger],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
