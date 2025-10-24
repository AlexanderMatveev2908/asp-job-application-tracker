import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-change-pwd-form',
  imports: [],
  templateUrl: './change-pwd-form.html',
  styleUrl: './change-pwd-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePwdForm {}
