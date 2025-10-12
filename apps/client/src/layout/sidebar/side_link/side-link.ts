import { Component, computed, input } from '@angular/core';
import { LinkT } from '../../../common/types/links';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LinksSvc } from '../../../core/ui_factory/links';

@Component({
  selector: 'app-side-link',
  imports: [NgComponentOutlet, RouterLink, NgClass],
  templateUrl: './side-link.html',
  styleUrl: './side-link.scss',
})
export class SideLink {
  public readonly lk = input.required<LinkT>();
  public readonly currPath = input.required<string | null>();
  public onSideClick = input.required<() => void>();

  public readonly isCurrPath = computed(() => LinksSvc.isCurrPath(this.currPath(), this.lk().path));
}
