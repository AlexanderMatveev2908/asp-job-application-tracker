import { Component, computed, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { SideLink } from './side_link/side-link';
import { BlackBg } from '@/common/components/black_bg/black-bg';
import { TxtClamp } from '@/common/components/txt/txt_clamp/txt-clamp';
import { USE_MOUSE_OUT__CB, USE_MOUSE_OUT__IS_OPEN } from '@/core/directives/use_mouse_out/tokens';
import { SidebarSlice } from '@/features/sidebar_slice';
import { LinksSvc } from '@/core/ui_factory/links';
import { UsePathSvc } from '@/core/hooks/use_path';
import { TxtClampConfT } from '@/common/components/txt/txt_clamp/etc/types';
import { UseMouseOutDir } from '@/core/directives/use_mouse_out/use_mouse_out';
import { BlackBgConfT } from '@/common/components/black_bg/etc/types';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtClamp, UseMouseOutDir, SideLink],
  providers: [
    {
      provide: USE_MOUSE_OUT__IS_OPEN,
      useFactory: (slice: SidebarSlice) => computed<boolean>(() => slice.sideState().isOpen),
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
export class Sidebar {
  private readonly sideSlice = inject(SidebarSlice);
  private readonly linksSvc = inject(LinksSvc);
  private readonly usePath = inject(UsePathSvc);

  public readonly isOpen = computed<boolean>(() => this.sideSlice.sideState().isOpen);
  public readonly allUsersLinks = this.linksSvc.allUsersLinks;
  public readonly currPath = this.usePath.currPath;

  public readonly blackBgConf = computed<BlackBgConfT>(() => ({
    isDark: this.isOpen(),
    zBg: 'z__sidebar__bg',
  }));

  public readonly onSideClick = (): void => {
    this.sideSlice.close();
  };

  public readonly txtClampConf: TxtClampConfT = {
    txt: 'john@gmail.com',
    size: 'lg',
    lines: 1,
  };
}
