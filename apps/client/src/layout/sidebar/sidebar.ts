import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
  Signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { BlackBg } from '@/layout/black_bg/black-bg';
import { TxtClamp } from '@/common/components/els/txt/txt_clamp/txt-clamp';
import { SidebarSlice } from '@/features/sidebar/slice';
import { LinksUiFkt } from '@/core/ui_factory/links';
import { UsePathSvc } from '@/core/hooks/use_path';
import { TxtClampPropsT } from '@/common/components/els/txt/txt_clamp/etc/types';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { LinkT } from '@/core/ui_factory/links/etc/types';
import { DropStatic } from '@/common/components/drop/static/drop-static';
import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { spanUserNotLogged } from './ui_factory';
import { Lorem } from '@/core/lib/etc';
import { NavLink } from '@/common/components/links/nav_link/nav-link';
import { UseMouseOutSvc } from '@/core/hooks/use_mouse_out';
import { RefDomT } from '@/common/types/etc';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtClamp, DropStatic, NavLink],

  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar extends Lorem {
  private readonly useMouseOut: UseMouseOutSvc = inject(UseMouseOutSvc);
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  private readonly usePath: UsePathSvc = inject(UsePathSvc);

  public readonly isDropOpen: WritableSignal<boolean> = signal(false);
  public readonly setIsDropOpen: (val: boolean) => void = (val: boolean) => {
    this.isDropOpen.set(val);
  };

  @ViewChild('side') side: RefDomT;

  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: Signal<string | null> = this.usePath.currPath;
  public readonly allUsersLinks: LinkT[] = LinksUiFkt.allUsers;
  public readonly notLoggedLinks: LinkT[] = LinksUiFkt.notLogged;

  public readonly spanUserProps: WritableSignal<SpanPropsT> = signal(spanUserNotLogged);

  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    isDark: this.isSideOpen(),
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

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    this.useMouseOut.onMouseOut(this.side, e, () => this.sideSlice.close());
  }
}
