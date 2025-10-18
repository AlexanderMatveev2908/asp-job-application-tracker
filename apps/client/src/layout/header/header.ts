import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SvgFillGhost } from '@/common/components/svgs/fill/ghost/ghost';
import { SvgStrokeUserWrite } from '@/common/components/svgs/stroke/user_write/user-write';
import { SvgStrokeBurger } from '@/common/components/svgs/stroke/burger/burger';
import { SvgFillClose } from '@/common/components/svgs/fill/close/close';
import { SidebarSlice } from '@/features/sidebar/slice';
import { DropAbs } from '@/common/components/drop/abs/drop-abs';
import { SpanPropsT, SpanSizesPropsT } from '@/common/components/els/span/etc/types';
import { NgClass } from '@angular/common';
import { LinksUiFkt } from '@/core/ui_factory/links';
import { LinkT } from '@/core/ui_factory/links/etc/types';
import { UsePathSvc } from '@/core/hooks/use_path';
import { NavLink } from '@/common/components/links/nav_link/nav-link';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, RouterLink, DropAbs, SvgFillClose, SvgStrokeBurger, NgClass, NavLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  // ? svc
  private readonly usePath: UsePathSvc = inject(UsePathSvc);
  private readonly sideSlice: SidebarSlice = inject(SidebarSlice);

  // ? derived
  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly currPath: Signal<string | null> = this.usePath.currPath;

  // ? helper
  public readonly toggleSide: () => void = () => {
    this.sideSlice.toggle();
  };

  // ? local state
  public readonly isDropOpen: WritableSignal<boolean> = signal(false);
  public readonly setIsDropOpen: (val: boolean) => void = (val: boolean) => {
    this.isDropOpen.set(val);
  };

  // ? static fields
  public readonly notLoggedLinks: LinkT[] = LinksUiFkt.notLogged;

  // ? app-span props
  public readonly spanDropProps: Signal<SpanPropsT> = computed(() => ({
    label: null,
    Svg: SvgStrokeUserWrite,
  }));
  public readonly spanDropSizesProps: Partial<SpanSizesPropsT> = {
    svg: '3xl',
  };
}
