import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  HostListener,
  inject,
  input,
  InputSignal,
  Signal,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { SpanPropsT, SpanSizesPropsT } from '../../els/span/etc/types';
import { Span } from '../../els/span/span';
import { SvgFillUp } from '../../svgs/fill/up/up';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ElDomT, RefDomT, TpltRedT } from '@/common/types/etc';
import { UseMouseOutSvc } from '@/core/hooks/use_mouse_out';
import { DropStaticTwdCss, RecTwdClsDropT } from './etc';

@Component({
  selector: 'app-drop-static',
  imports: [Span, SvgFillUp, NgClass, NgTemplateOutlet],
  templateUrl: './drop-static.html',
  styleUrl: './drop-static.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropStatic implements AfterViewInit, AfterContentChecked {
  private readonly useMouseOut: UseMouseOutSvc = inject(UseMouseOutSvc);

  // ? app-span component props
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'xl',
  };
  // ? personal props
  public readonly isOpen: InputSignal<boolean> = input.required();
  public readonly setIsOpen: InputSignal<(val: boolean) => void> = input.required();
  // ? derived state by children h
  private readonly wrapperH: WritableSignal<number> = signal(0);

  // ? children & projected
  @ViewChild('wrapContent') wrapContent: RefDomT;
  @ViewChild('drop') drop: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef!: TpltRedT;

  // ? style
  public readonly twd: Signal<RecTwdClsDropT> = computed(() => {
    const isDropOpen: boolean = this.isOpen();
    return DropStaticTwdCss.byState(isDropOpen);
  });

  public readonly maxH: Signal<string> = computed(() =>
    this.isOpen() ? `${this.wrapperH()}px` : '0px'
  );

  // ? listeners & ng lifecycle
  public onClick(): void {
    this.setIsOpen()(!this.isOpen());
  }

  private patchH(): void {
    const wrapContentDOM: ElDomT = this.wrapContent?.nativeElement;
    if (!wrapContentDOM) return;

    this.wrapperH.set(wrapContentDOM.scrollHeight);
  }

  ngAfterViewInit(): void {
    this.patchH();
  }

  ngAfterContentChecked(): void {
    this.patchH();
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: MouseEvent): void {
    this.useMouseOut.onMouseOut(this.drop, e, () => this.setIsOpen()(false));
  }
}
