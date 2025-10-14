import { Header } from '@/layout/header/header';
import { Sidebar } from '@/layout/sidebar/sidebar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from '@/layout/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
