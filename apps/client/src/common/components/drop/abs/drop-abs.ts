import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { UseDropDir } from '@/core/directives/use_drop';
import { UseIDsDir } from '@/core/directives/use_ids';

@Component({
  selector: 'app-drop-abs',
  imports: [Span, NgTemplateOutlet, NgClass],
  templateUrl: './drop-abs.html',
  styleUrl: './drop-abs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropAbs {
  // ? directives
  public readonly useIDsDir: UseIDsDir = inject(UseIDsDir);
  public readonly useDropDir: UseDropDir = inject(UseDropDir);

  // ? app-span props
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input.required();

  // ? derived data
  public readonly translation: Signal<string> = computed(() =>
    this.useDropDir.isOpen()
      ? 'translate-y-[0%] opacity-1'
      : 'translate-y-[40%] pointer-events-none opacity-0'
  );
}
