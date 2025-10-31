import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-hits-counter',
  imports: [],
  templateUrl: './hits-counter.html',
  styleUrl: './hits-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitsCounter {
  public readonly nHits: InputSignal<Nullable<number>> = input.required();
}
