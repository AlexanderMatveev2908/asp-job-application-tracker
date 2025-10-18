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
import { DomPortalOutlet, TemplatePortal, PortalModule } from '@angular/cdk/portal';

export type ElDomT = HTMLElement | null;

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [PortalModule],
  templateUrl: './portal.html',
  styleUrl: './portal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portal implements AfterViewInit {
  private readonly injector: Injector = inject(Injector);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly vcr: ViewContainerRef = inject(ViewContainerRef);

  @ContentChild('content', { read: TemplateRef })
  public content!: TemplateRef<unknown>;

  private static outlet: DomPortalOutlet | null = null;
  private attached: boolean = false;

  ngAfterViewInit(): void {
    const rootPortal: ElDomT = document.getElementById('root-portal');
    if (!rootPortal || !this.content) return;

    if (!Portal.outlet) Portal.outlet = new DomPortalOutlet(rootPortal, this.appRef, this.injector);

    if (this.attached || !Portal.outlet || Portal.outlet.hasAttached()) return;

    const portal: TemplatePortal<unknown> = new TemplatePortal<unknown>(this.content, this.vcr);
    Portal.outlet.attach(portal);
    this.attached = true;
  }
}
