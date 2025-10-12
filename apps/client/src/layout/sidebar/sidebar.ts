import { Component, computed, inject } from '@angular/core';
import { BlackBg } from '../../common/components/black_bg/black-bg';
import { SidebarSlice } from '../../features/sidebar_slice';
import { NgClass } from '@angular/common';
import { TxtClamp } from '../../common/components/txt/txt_clamp/txt-clamp';
import { Lorem } from '../../core/lib/etc';
import { UseMouseOutDir } from '../../core/directives/use_mouse_out/use_mouse_out';
import {
  USE_MOUSE_OUT__CB,
  USE_MOUSE_OUT__IS_OPEN,
} from '../../core/directives/use_mouse_out/tokens';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtClamp, UseMouseOutDir],
  providers: [
    {
      provide: USE_MOUSE_OUT__IS_OPEN,
      useFactory: (slice: SidebarSlice) => computed(() => slice.sideState().isOpen),
      deps: [SidebarSlice],
    },
    {
      provide: USE_MOUSE_OUT__CB,
      useFactory: (slice: SidebarSlice) => () => slice.close(),
      deps: [SidebarSlice],
    },
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar extends Lorem {
  private readonly sideSlice = inject(SidebarSlice);

  public readonly isOpen = computed((): boolean => this.sideSlice.sideState().isOpen);
}
