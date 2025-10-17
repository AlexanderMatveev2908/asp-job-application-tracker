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
import { LinksSvc } from '@/core/ui_factory/links';
import { LinkT } from '@/common/types/links';
import { Span } from '@/common/components/els/span/span';

@Component({
  selector: 'app-header',
  imports: [SvgFillGhost, RouterLink, DropAbs, SvgFillClose, SvgStrokeBurger, NgClass, Span],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly linksSvc: LinksSvc = inject(LinksSvc);

  public readonly sideSlice: SidebarSlice = inject(SidebarSlice);
  public readonly isSideOpen: Signal<boolean> = computed(() => this.sideSlice.sideState().isOpen);
  public readonly isDropOpen: WritableSignal<boolean> = signal(false);

  public readonly toggleSide: () => void = () => {
    this.sideSlice.toggle();
  };
  public readonly setIsDropOpen: (val: boolean) => void = (val: boolean) => {
    this.isDropOpen.set(val);
  };

  public readonly notLoggedLinks: LinkT[] = this.linksSvc.notLogged;
  public readonly spanSizesDrop: SpanSizesPropsT = {
    svg: 'md',
    txt: 'lg',
  };

  public readonly spanProps: Signal<SpanPropsT> = computed(() => ({
    label: null,
    Svg: SvgStrokeUserWrite,
  }));
  public readonly spanSizesProps: Partial<SpanSizesPropsT> = {
    svg: '3xl',
  };
}
