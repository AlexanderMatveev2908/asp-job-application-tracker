import { ElDomT } from '@/common/types/etc';
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-portal',
  imports: [],
  templateUrl: './portal.html',
  styleUrl: './portal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portal implements AfterViewInit {
  private readonly injector: Injector = inject(Injector);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly vcr: ViewContainerRef = inject(ViewContainerRef);

  @ContentChild('content', { read: TemplateRef }) content!: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    const rootPortal: ElDomT = document.getElementById('root-portal');
    if (!rootPortal || !this.content) return;

    const outletDOM = new DomPortalOutlet(rootPortal, this.appRef, this.injector);

    const contentTpl = new TemplatePortal(this.content, this.vcr);
    outletDOM.attach(contentTpl);
  }
}
