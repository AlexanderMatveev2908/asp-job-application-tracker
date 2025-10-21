import { Nullable } from '@/common/types/etc';
import { UseInjCtx } from '@/core/directives/use_inj_ctx';
import { UseNavSvc } from '@/core/hooks/use_nav/use_nav';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-span-links',
  imports: [],
  templateUrl: './auth-span-links.html',
  styleUrl: './auth-span-links.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSpanLinks extends UseInjCtx implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  ngOnInit(): void {
    this.useEffect(() => {
      const path: Nullable<string> = this.useNav.currPath();

      console.log(path);
    });
  }
}
