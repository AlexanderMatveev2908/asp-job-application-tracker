import { Component, computed, effect, inject } from '@angular/core';
import { SvgFillGhost } from '../../common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '../../common/components/svgs/stroke/user_write/user-write';
import { RouterLink } from '@angular/router';
import { SvgStrokeBurger } from '../../common/components/svgs/stroke/burger/burger';
import { SidebarSlice } from '../../features/sidebar_slice';
import { Log } from '../../core/lib/log';
import { NgClass } from '@angular/common';
import { SvgFillClose } from '../../common/components/svgs/fill/close/close';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, SvgStrokeUserWrite, RouterLink, SvgStrokeBurger, SvgFillClose, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly sideSlice = inject(SidebarSlice);
  public readonly isOpen = computed(() => this.sideSlice.sideState().isOpen);

  private readonly log = effect(() => {
    Log.log(this.sideSlice.sideState());
  });

  public handleToggle(): void {
    this.sideSlice.toggle();
  }
}
