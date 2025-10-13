import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-spin-page-ssr',
  imports: [NgClass],
  templateUrl: './spin-page-ssr.html',
  styleUrl: './spin-page-ssr.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinPageSsr {
  public readonly minH: InputSignal<string> = input('min-h-screen');

  public readonly IDs: string[] = Array.from({ length: 10 }, () => v4());
  private readonly dotsCount: number = this.IDs.length;

  public getRotation(idx: number): string {
    // eslint-disable-next-line no-magic-numbers
    return `${(360 / this.dotsCount) * idx}deg`;
  }

  public getDelay(idx: number): string {
    return `${(1 / this.dotsCount) * idx}s`;
  }
}
