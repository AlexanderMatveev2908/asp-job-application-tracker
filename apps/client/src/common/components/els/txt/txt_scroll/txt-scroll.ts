import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { UseTxtDir } from '@/core/directives/use_txt';

@Component({
  selector: 'app-txt-scroll',
  imports: [NgClass],
  templateUrl: './txt-scroll.html',
  styleUrl: './txt-scroll.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtScroll extends UseTxtDir {}
