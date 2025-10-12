import { Component, computed, inject } from '@angular/core';
import { BlackBg } from '../../common/components/black_bg/black-bg';
import { SidebarSlice } from '../../features/sidebar_slice';
import { NgClass } from '@angular/common';
import { TxtScroll } from '../../common/components/txt/txt_scroll/txt-scroll';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtScroll],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly sideSlice = inject(SidebarSlice);

  public readonly isOpen = computed(() => this.sideSlice.sideState().isOpen);
}
