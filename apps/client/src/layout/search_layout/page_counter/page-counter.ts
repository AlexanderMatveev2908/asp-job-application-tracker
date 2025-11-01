import { SpanEventPropsT } from '@/common/components/els/span/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
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
import { BtnListenersT, BtnStatePropsT } from '@/common/types/etc';
import { UsePaginationHk } from '@/layout/search_layout/search_bar/etc/hooks/use_pagination';
import { PageT } from './etc/types';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { PageCounterBlockChangeKeyT, PageCounterUiFkt } from './etc/ui_fkt';
import { LibPageCounter } from './etc/lib';
import { NgClass } from '@angular/common';
import {
  UseSearchBarPaginationPropsDir,
  UseSearchBarStrategyPropsDir,
} from '../search_bar/etc/directives/use_search_bar_props';

export type ChangeBlockMarkT = '+' | '-';

@Component({
  selector: 'app-page-counter',
  imports: [BtnShadow, UseIDsDir, UseSpanDir, NgClass],
  templateUrl: './page-counter.html',
  styleUrl: './page-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCounter<T> extends UseInjCtxHk implements OnInit {
  // ? directives
  public readonly useSearchBarStrategyProps: UseSearchBarStrategyPropsDir<T> = inject(
    UseSearchBarStrategyPropsDir
  );
  public readonly useSearchbarPaginationPropsDir: UseSearchBarPaginationPropsDir = inject(
    UseSearchBarPaginationPropsDir
  );

  // ? personal props
  public readonly usePagination: InputSignal<UsePaginationHk> = input.required();

  // ? local state
  public readonly pagesPerBlock: WritableSignal<number> = signal(1);

  // ? props change block btn
  public readonly btnsBlockChange: Record<PageCounterBlockChangeKeyT, SpanEventPropsT> =
    PageCounterUiFkt.btns;

  // ? derived
  public readonly pagesUi: Signal<PageT[]> = computed(() => {
    const len: number = this.pagesPerBlock();
    const start: number = len * this.usePagination().block();

    const pagesLessOverflow: PageT[] = Array.from({ length: len }, (_: undefined, i: number) =>
      RootUiFkt.withID({
        label: start + 1 + i + '',
        val: start + i,
      })
    ).filter((p: PageT) => p.val < (this.useSearchbarPaginationPropsDir.pages() ?? 0));

    return pagesLessOverflow;
  });

  public readonly maxBlocksAvailable: Signal<number> = computed(() => {
    const decimal: number =
      (this.useSearchbarPaginationPropsDir.pages() ?? 0) / this.pagesPerBlock();

    return Math.max(1, Math.ceil(decimal));
  });

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
      if (newLimitItemsPerPage === this.usePagination().limit()) return;

      this.useSearchBarStrategyProps.triggerStrategy()({
        dataForm: null,
        dataPagination: { limit: newLimitItemsPerPage },
      });
      this.usePagination().limit.set(newLimitItemsPerPage);
    });
  }

  public changePage(p: PageT): void {
    const newPage: number = p.val;
    this.usePagination().page.set(newPage);

    this.useSearchBarStrategyProps.triggerStrategy()({
      dataForm: null,
      dataPagination: { page: newPage },
    });
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
      const maxAvailable: number = LibPageCounter.lessOneButGteToZero(
        this.useSearchbarPaginationPropsDir.pages() ?? 0
      );

      if (pageSig() <= maxAvailable) return;

      pageSig.set(maxAvailable);
    });
  }

  private ifBlockBiggerThanAvailable(): void {
    this.useEffect(() => {
      const blockSig: WritableSignal<number> = this.usePagination().block;
      const maxAvailable: number = LibPageCounter.lessOneButGteToZero(this.maxBlocksAvailable());

      if (blockSig() <= maxAvailable) return;

      blockSig.set(maxAvailable);
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
