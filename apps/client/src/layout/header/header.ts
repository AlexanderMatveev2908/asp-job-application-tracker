import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { SvgFillGhost } from '@/common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '@/common/components/svgs/stroke/user_write/user-write';
import { SvgStrokeBurger } from '@/common/components/svgs/stroke/burger/burger';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { SidebarSlice } from '@/features/sidebar_slice';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, SvgStrokeUserWrite, RouterLink, SvgStrokeBurger, SvgFillClose, NgClass],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public readonly sideSlice = inject(SidebarSlice);
  public readonly isOpen = computed<boolean>(() => this.sideSlice.sideState().isOpen);

  public handleToggle(): void {
    this.sideSlice.toggle();
  }
}
