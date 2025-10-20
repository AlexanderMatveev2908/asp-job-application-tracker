import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  HostListener,
  inject,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { RefDomT, TpltRedT } from '@/common/types/etc';
import { UseMouseOutSvc } from '@/core/hooks/use_mouse_out';

@Component({
  selector: 'app-drop-abs',
  imports: [Span, NgTemplateOutlet, NgClass],
  templateUrl: './drop-abs.html',
  styleUrl: './drop-abs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropAbs {
  private readonly useMouseOut: UseMouseOutSvc = inject(UseMouseOutSvc);

  // ? personal props
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly setIsOpen: InputSignal<(val: boolean) => void> = input.required();
  // ? app-span props
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input.required();

  // ? derived data
  public readonly translation: Signal<string> = computed(() =>
    this.isOpen() ? 'translate-y-[0%] opacity-1' : 'translate-y-[40%] pointer-events-none opacity-0'
  );

  // ? children & projected
  @ViewChild('drop') drop: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef!: TpltRedT;

  // ? listeners
  public onClick(): void {
    this.setIsOpen()(!this.isOpen());
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    this.useMouseOut.onMouseOut(this.drop, e, () => this.setIsOpen()(false));
  }
}
