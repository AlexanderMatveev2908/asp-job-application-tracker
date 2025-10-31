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
import { BtnListenersT, BtnStatePropsT, Nullable } from '@/common/types/etc';
import { UsePaginationHk } from '@/core/hooks/use_pagination';
import { PageT } from './etc/types';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { PageCounterBlockChangeKeyT, PageCounterUiFkt } from './etc/ui_fkt';
import { LibPageCounter } from './etc/lib';
import { NgClass } from '@angular/common';

export type ChangeBlockMarkT = '+' | '-';

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
    const len: number = this.pagesPerBlock();
    const start: number = len * this.usePagination().block();

    return Array.from({ length: len }, (_: undefined, i: number) =>
      RootUiFkt.withID({
        label: start + 1 + i + '',
        val: start + i,
      })
    ).filter((p: PageT) => p.val < (this.totPages() ?? 0));
  });

  public readonly maxBlocksAvailable: Signal<number> = computed(() =>
    Math.ceil((this.totPages() ?? 0) / this.pagesPerBlock())
  );

  // ? helpers
  public twdPage(p: PageT): string {
    return p.val === this.usePagination().page() ? 'bg-gray-300 text-neutral-950 scale-[1.25]' : '';
  }

  private readonly changeBlock: (v: ChangeBlockMarkT) => void = (v: ChangeBlockMarkT) => {
    const blockSig: WritableSignal<number> = this.usePagination().block;
    blockSig.set(blockSig() + (v === '+' ? 1 : -1));
  };

  // ? listeners
  private refreshPaginationUi(): void {
    this.usePlatform.onClient(() => {
      const newPagesPerBlock: number = LibPageCounter.paginationVals.get('pagePerBlock')!();
      this.pagesPerBlock.set(newPagesPerBlock);

      const newLimitItemsPerPage: number = LibPageCounter.paginationVals.get('limit')!();
      this.usePagination().limit.set(newLimitItemsPerPage);
    });
  }

  public changePage(p: PageT): void {
    this.usePagination().page.set(p.val);
  }

  // ? props btns
  public readonly listenersPrev: BtnListenersT = {
    onClick: this.changeBlock.bind(this, '-'),
  };
  public readonly prevState: Signal<BtnStatePropsT> = computed(() => ({
    isPending: false,
    isDisabled: this.usePagination().block() <= 0,
  }));
  public readonly listenersNext: BtnListenersT = {
    onClick: this.changeBlock.bind(this, '+'),
  };
  public readonly nextState: Signal<BtnStatePropsT> = computed(() => ({
    isPending: false,
    isDisabled: this.usePagination().block() >= this.maxBlocksAvailable() - 1,
  }));

  // ? edge cases
  private ifPageBiggerThanAvailable(): void {
    this.useEffect(() => {
      const pageSig: WritableSignal<number> = this.usePagination().page;
      const maxAvailable: number = this.totPages() ?? 0;

      if (pageSig() <= maxAvailable - 1) return;

      pageSig.set(maxAvailable - 1);
    });
  }

  private ifBlockBiggerThanAvailable(): void {
    this.useEffect(() => {
      const blockSig: WritableSignal<number> = this.usePagination().block;
      const maxAvailable: number = this.maxBlocksAvailable();

      if (blockSig() <= maxAvailable - 1) return;

      blockSig.set(this.maxBlocksAvailable() - 1);
    });
  }

  ngOnInit(): void {
    this.refreshPaginationUi();

    this.ifPageBiggerThanAvailable();
    this.ifBlockBiggerThanAvailable();
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.refreshPaginationUi();
  }
}
