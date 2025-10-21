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
import { UseMetaSpanDir } from '@/core/directives/span/1.use_span_meta';

@Component({
  selector: 'app-link-shadow',
  imports: [RouterLink, NgTemplateOutlet, Span],
  templateUrl: './link-shadow.html',
  styleUrl: './link-shadow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkShadow extends UseMetaSpanDir {
  public readonly path: InputSignal<string> = input.required();

  // ? derived
  public readonly isExternal: Signal<boolean> = computed(() =>
    /^(https?:\/\/|mailto:|tel:)/.test(this.path())
  );
}
