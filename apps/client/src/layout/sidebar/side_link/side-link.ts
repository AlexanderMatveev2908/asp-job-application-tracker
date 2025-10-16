import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LinkT } from '@/common/types/links';
import { LinksSvc } from '@/core/ui_factory/links';
import { PairTxtSvg } from '@/common/components/els/span/pair-txt-svg';
import { SpanSizesPropsT } from '@/common/components/els/span/etc/types';

@Component({
  selector: 'app-side-link',
  imports: [RouterLink, NgClass, PairTxtSvg],
  templateUrl: './side-link.html',
  styleUrl: './side-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideLink {
  public readonly lk: InputSignal<LinkT> = input.required();
  public readonly currPath: InputSignal<string | null> = input.required();
  public readonly onSideClick: InputSignal<() => void> = input.required();

  public readonly isCurrPath: Signal<boolean> = computed(() =>
    LinksSvc.isCurrPath(this.currPath(), this.lk().path)
  );

  public readonly spanSizesProps: SpanSizesPropsT = {
    txt: 'lg',
    svg: 'xl',
  };
}
