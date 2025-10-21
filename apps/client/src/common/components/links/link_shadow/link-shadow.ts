import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { Span } from '../../els/span/span';
import { UseSpanDir } from '@/core/directives/span/use_span';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, Span],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow extends UseSpanDir {
  public readonly path: InputSignal<string> = input.required();

  // ? derived
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.path())
  );
}
