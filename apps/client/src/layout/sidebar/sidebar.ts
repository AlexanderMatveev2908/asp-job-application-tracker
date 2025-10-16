import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { SideLink } from './side_link/side-link';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { TxtClamp } from '@/common/components/els/txt/txt_clamp/txt-clamp';
import { USE_MOUSE_OUT__CB, USE_MOUSE_OUT__IS_OPEN } from '@/core/directives/use_mouse_out/tokens';
import { SidebarSlice } from '@/features/sidebar/slice';
import { LinksSvc } from '@/core/ui_factory/links';
import { UsePathSvc } from '@/core/hooks/use_path';
import { TxtClampPropsT } from '@/common/components/els/txt/txt_clamp/etc/types';
import { UseMouseOutDir } from '@/core/directives/use_mouse_out/use_mouse_out';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { LinkT } from '@/common/types/links';
import { DropStatic } from '@/common/components/drop/static/drop-static';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { spanUserNotLogged } from './ui_factory';
import { Lorem } from '@/core/lib/etc';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtClamp, UseMouseOutDir, SideLink, DropStatic],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar extends Lorem {
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  private readonly linksSvc: LinksSvc = inject(LinksSvc);
  private readonly usePath: UsePathSvc = inject(UsePathSvc);

  public readonly isOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: WritableSignal<string | null> = this.usePath.currPath;
  public readonly allUsersLinks: LinkT[] = this.linksSvc.allUsers;
  public readonly notLoggedLinks: LinkT[] = this.linksSvc.notLogged;

  public readonly spanUserProps: WritableSignal<SpanPropsT> = signal(spanUserNotLogged);

  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    isDark: this.isOpen(),
    zBg: 'z__sidebar__bg',
  }));

  public readonly onSideClick: () => void = (): void => {
    this.sideSlice.close();
  };

  public readonly txtClampProps: TxtClampPropsT = {
    txt: 'john@gmail.com',
    size: 'lg',
    lines: 1,
  };
}
