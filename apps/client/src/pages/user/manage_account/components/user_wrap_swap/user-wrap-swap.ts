import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-user-wrap-swap',
  imports: [],
  templateUrl: './user-wrap-swap.html',
  styleUrl: './user-wrap-swap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserWrapSwap {
  public readonly title: InputSignal<string> = input.required();
}
