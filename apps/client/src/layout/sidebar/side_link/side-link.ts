import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LinkT } from '@/common/types/links';
import { LinksSvc } from '@/core/ui_factory/links';

@Component({
  selector: 'app-side-link',
  imports: [NgComponentOutlet, RouterLink, NgClass],
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
}
