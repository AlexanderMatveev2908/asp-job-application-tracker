import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { BtnShadow } from '@/common/components/btns/btn_shadow/btn-shadow';
import { UseIDsDir } from '@/core/directives/use_ids';
import { UseSpanDir } from '@/core/directives/use_span';
import { Nullable } from '@/common/types/etc';
import { UsePaginationHk } from '@/core/hooks/use_pagination';
import { PageT } from './etc/types';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { PageCounterBlockChangeKeyT, PageCounterUiFkt } from './etc/ui_fkt';
import { LibPageCounter } from './etc/lib';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-page-counter',
  imports: [BtnShadow, UseIDsDir, UseSpanDir, NgClass],
  templateUrl: './page-counter.html',
  styleUrl: './page-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCounter extends UseInjCtxHk implements OnInit {
  // ? personal props
  public readonly totPages: InputSignal<Nullable<number>> = input.required();
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();

  // ? local state
  public readonly pagesPerBlock: WritableSignal<number> = signal(1);

  // ? props change block btn
  public readonly btnsBlockChange: Record<PageCounterBlockChangeKeyT, SpanEventPropsT> =
    PageCounterUiFkt.btns;

  // ? derived
  public readonly pages: Signal<PageT[]> = computed(() => {
    const len: number = (this.usePagination().block() || 1) * this.pagesPerBlock();
    const start: number = this.usePagination().page() * this.usePagination().limit();

    return Array.from({ length: len }, (_: undefined, i: number) =>
      RootUiFkt.withID({
        label: start + 1 + i + '',
        val: start + i,
      })
    );
  });

  // ? helpers
  public twdPage(p: PageT): string {
    return p.val === this.usePagination().page() ? 'bg-gray-300 text-neutral-950 scale-[1.25]' : '';
  }

  // ? listeners
  private refreshVals(): void {
    this.usePlatform.onClient(() => {
      this.pagesPerBlock.set(LibPageCounter.paginationVals.get('pagePerBlock')!());
    });
  }

  ngOnInit(): void {
    this.refreshVals();

    this.useEffect(() => {
      console.log(this.pages());
    });
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.refreshVals();
  }
}
