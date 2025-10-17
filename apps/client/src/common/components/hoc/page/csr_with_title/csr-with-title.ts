import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-csr-with-title',
  imports: [],
  templateUrl: './csr-with-title.html',
  styleUrl: './csr-with-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsrWithTitle {}
