import { UseRouteMngDir } from '@/core/directives/use_route_mng';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-auth',
  imports: [RouterOutlet],
  templateUrl: './layout-auth.html',
  styleUrl: './layout-auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuth extends UseRouteMngDir implements OnInit {
  ngOnInit(): void {
    this.pushOutLogged('/auth');
  }
}
