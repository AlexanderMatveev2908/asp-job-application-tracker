import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { TestApiSvc } from '@/features/test/api';
import { UseRouterProtectionDir } from '@/core/directives/use_router_protection';

@Component({
  selector: 'app-protected',
  imports: [PageWrapper],
  templateUrl: './protected.html',
  styleUrl: './protected.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Protected extends UseRouterProtectionDir implements OnInit {
  private readonly testApi: TestApiSvc = inject(TestApiSvc);

  public readonly fetchingUser: Signal<boolean> = computed(
    () => this.userSlice.userState().isPending
  );

  ngOnInit(): void {
    this.pushOutNotLogged('/protected');

    if (!this.isLoggedAllowed()) return;

    this.testApi.protectedData().subscribe();
  }
}
