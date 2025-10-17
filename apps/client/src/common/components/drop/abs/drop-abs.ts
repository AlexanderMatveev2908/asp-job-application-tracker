import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  HostListener,
  input,
  InputSignal,
  Signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/etc';

@Component({
  selector: 'app-drop-abs',
  imports: [Span, NgTemplateOutlet, NgClass],
  templateUrl: './drop-abs.html',
  styleUrl: './drop-abs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropAbs {
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly setIsDropOpen: InputSignal<(val: boolean) => void> = input.required();
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: InputSignal<Partial<SpanSizesPropsT>> = input.required();

  public readonly translation: Signal<string> = computed(() =>
    this.isOpen() ? 'translate-y-[0%] opacity-1' : 'translate-y-[40%] pointer-events-none opacity-0'
  );

  @ViewChild('drop') drop: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef!: TemplateRef<unknown>;

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    const elDOM: ElDomT = this.drop?.nativeElement;
    const target: HTMLElement = e.target as HTMLElement;
    if (!elDOM) return;

    if (!elDOM.contains(target)) this.setIsDropOpen()(false);
  }
}
