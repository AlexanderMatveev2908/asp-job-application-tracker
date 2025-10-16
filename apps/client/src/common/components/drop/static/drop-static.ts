import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
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
import { Lorem } from '@/core/lib/etc';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/etc';
import { RecTwdClsDropT } from '../etc/types';

@Component({
  selector: 'app-drop-static',
  imports: [Span, SvgFillUp, NgClass, NgTemplateOutlet],
  templateUrl: './drop-static.html',
  styleUrl: './drop-static.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropStatic extends Lorem implements AfterViewInit, AfterContentChecked {
  public readonly spanProps: InputSignal<SpanPropsT> = input.required();
  public readonly isOpen: WritableSignal<boolean> = signal(false);
  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'xl',
  };
  private readonly wrapperH: WritableSignal<number> = signal(0);

  @ViewChild('wrapContent') wrapContent: RefDomT;
  @ContentChild('dropContent', { read: TemplateRef }) dropContentRef!: TemplateRef<unknown>;

  public readonly twd: Signal<RecTwdClsDropT> = computed(() => {
    const isOp: boolean = this.isOpen();
    return {
      root: isOp ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-300',
      arrow: isOp ? 'rotate-180' : 'rotate-0',
      wrapContent: isOp ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-[-15px]',
    };
  });

  public readonly maxH: Signal<string> = computed(() =>
    this.isOpen() && this.wrapperH ? `${this.wrapperH()}px` : '0px'
  );

  public onClick(): void {
    this.isOpen.set(!this.isOpen());
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
}
