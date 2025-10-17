import { LinkT } from '@/common/types/links';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanSizesPropsT } from '../../els/span/etc/types';
import { LinksCls } from '@/core/ui_factory/links';
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
  public readonly spanProps: InputSignal<LinkT> = input.required();
  public readonly currPath: InputSignal<string | null> = input.required();
  public readonly setIsDropOpen: InputSignal<(val: boolean) => void> = input.required();

  public readonly spanSizesProps: SpanSizesPropsT = {
    svg: 'md',
    txt: 'lg',
  };

  public readonly isActive: Signal<boolean> = computed(() =>
    LinksCls.isCurrPath(this.currPath(), this.spanProps().path)
  );
}
