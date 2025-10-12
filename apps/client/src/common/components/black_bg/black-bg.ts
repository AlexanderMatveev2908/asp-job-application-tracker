import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-black-bg',
  imports: [NgClass],
  templateUrl: './black-bg.html',
  styleUrl: './black-bg.scss',
})
export class BlackBg {
  public isDark = input.required<boolean>();
  public zBg = input.required<string>();
}
