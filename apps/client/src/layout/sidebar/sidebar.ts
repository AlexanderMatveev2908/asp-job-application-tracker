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
import { LinksUiFkt } from '@/core/ui_fkt/links';
import { BlackBgPropsT } from '@/layout/black_bg/etc/types';
import { DropStatic } from '@/common/components/drop/static/drop-static';
import {
  SpanLinkPropsT,
  SpanPropsT,
  SpanSizesPropsT,
} from '@/common/components/els/span/etc/types';
import { spanUserLogged, spanUserNotLogged } from './etc/ui_fkt';
import { Lorem } from '@/core/lib/etc';
import { NavLink } from '@/common/components/links/nav_link/nav-link';
import { UseMouseOutSvc } from '@/core/hooks/use_mouse_out';
import { Nullable, RefDomT } from '@/common/types/etc';
import { Prs } from '@/core/lib/data_structure/prs';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { TxtPropsT } from '@/common/components/els/txt/etc/types';
import { UserSlice } from '@/features/user/slice';
import { UserT } from '@/features/user/etc/types';

@Component({
  selector: 'app-sidebar',
  imports: [BlackBg, NgClass, TxtClamp, DropStatic, NavLink],

  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar extends Lorem {
  // ? svc
  private readonly useMouseOut: UseMouseOutSvc = inject(UseMouseOutSvc);
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly userSlice: UserSlice = inject(UserSlice);

  // ? local state
  public readonly isDropOpen: WritableSignal<boolean> = signal(false);
  public readonly setIsDropOpen: (val: boolean) => void = (val: boolean) => {
    this.isDropOpen.set(val);
  };

  // ? children
  @ViewChild('side') side: RefDomT;

  // ? testId
  public testIdFromPath(path: string): string {
    return Prs.toSnake(`sidebar__${path}`);
  }

  // ? derived
  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: Signal<Nullable<string>> = this.useNav.currPath;

  // ? static fields
  public readonly allUsersLinks: SpanLinkPropsT[] = LinksUiFkt.allUsers;
  public readonly linksUser: Signal<SpanLinkPropsT[]> = computed(() => {
    const user: Nullable<UserT> = this.userSlice.userState().user;

    const links: SpanLinkPropsT[] = user
      ? LinksUiFkt.getLoggedByVerifyStatus(user.verified)
      : LinksUiFkt.notLogged;

    console.log(links);
    return links;
  });

  // ? app-span props
  public readonly spanUserProps: Signal<SpanPropsT> = computed(() =>
    this.userSlice.userState().user ? spanUserLogged : spanUserNotLogged
  );
  public readonly navLinkSpanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'md',
  };

  // ? txt-clamp props
  public readonly txtClampProps: TxtPropsT = {
    txt: 'john@gmail.com',
    size: 'lg',
  };

  // ? black bg overlay props
  public readonly blackBgProps: Signal<BlackBgPropsT> = computed(() => ({
    isDark: this.isSideOpen(),
    zBg: 'z__sidebar__bg',
  }));

  // ? listeners
  public readonly onSideClick: () => void = (): void => {
    this.sideSlice.close();
  };

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    this.useMouseOut.onMouseOut(this.side, e, () => this.sideSlice.close());
  }
}
