import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-change-mail-form',
  imports: [],
  templateUrl: './change-mail-form.html',
  styleUrl: './change-mail-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeMailForm {}
