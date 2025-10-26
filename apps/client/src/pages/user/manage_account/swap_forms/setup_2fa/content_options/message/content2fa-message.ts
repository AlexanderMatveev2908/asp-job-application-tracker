import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-content2fa-message',
  imports: [NgComponentOutlet],
  templateUrl: './content2fa-message.html',
  styleUrl: './content2fa-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content2faMessage {
  public readonly txt: InputSignal<string> = input.required();

  public readonly useMetaEvent: UseMetaEventDir = inject(UseMetaEventDir);
}
