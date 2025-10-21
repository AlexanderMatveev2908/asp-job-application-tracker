import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { UseTxtDir } from '@/core/directives/use_txt';

@Component({
  selector: 'app-txt-clamp',
  imports: [NgClass],
  templateUrl: './txt-clamp.html',
  styleUrl: './txt-clamp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TxtClamp extends UseTxtDir {
  public readonly lines: InputSignal<number> = input.required();
}
