import { LinkT } from '@/core/ui_fkt/links/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanSizesPropsT } from '../../els/span/etc/types';
import { LinksUiFkt } from '@/core/ui_fkt/links';
import { RouterLink } from '@angular/router';
import { Span } from '../../els/span/span';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink, Span, NgClass],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLink {
  // ? app-span props
  public readonly spanProps: InputSignal<LinkT> = input.required();
  public readonly spanSizesProps: SpanSizesPropsT = {
    svg: 'md',
    txt: 'lg',
  };

  // ? personal props
  public readonly currPath: InputSignal<string | null> = input.required();
  public readonly setIsDropOpen: InputSignal<(val: boolean) => void> = input.required();

  // ? derived
  public readonly isActive: Signal<boolean> = computed(() =>
    LinksUiFkt.isCurrPath(this.currPath(), this.spanProps().path)
  );
}
