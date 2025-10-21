import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { LinksUiFkt } from '@/core/ui_fkt/links';
import { RouterLink } from '@angular/router';
import { Span } from '../../els/span/span';
import { NgClass } from '@angular/common';
import { Nullable } from '@/common/types/etc';
import { UseSpanRootDir } from '@/core/directives/span/0.use_span_root';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink, Span, NgClass],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLink extends UseSpanRootDir {
  // ? app-span props
  public readonly path: InputSignal<string> = input.required();

  // ? personal props
  public readonly currPath: InputSignal<Nullable<string>> = input.required();
  public readonly setIsDropOpen: InputSignal<(val: boolean) => void> = input.required();

  // ? derived
  public readonly isActive: Signal<boolean> = computed(() =>
    LinksUiFkt.isCurrPath(this.currPath(), this.path())
  );
}
