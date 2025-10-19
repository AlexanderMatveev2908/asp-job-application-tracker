import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  effect,
  inject,
  Injector,
  input,
  InputSignal,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DomPortalOutlet, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { RecCoordsT } from '@/core/hooks/use_portal';
import { UsePlatformSvc } from '@/core/hooks/use_platform';
import { ElDomT } from '@/common/types/etc';
import { v4 } from 'uuid';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [PortalModule],
  templateUrl: './portal.html',
  styleUrl: './portal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portal implements AfterViewInit, OnDestroy {
  // ? svc
  private readonly injector: Injector = inject(Injector);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly vcr: ViewContainerRef = inject(ViewContainerRef);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? input signal
  public readonly coords: InputSignal<Partial<RecCoordsT>> = input.required();

  // ? projected template
  @ContentChild('tpl', { read: TemplateRef })
  public tpl!: TemplateRef<unknown>;

  // ? local refs
  private outlet: DomPortalOutlet | null = null;
  private attached: boolean = false;
  private contentEl: HTMLElement | null = null;
  private readonly id: string = v4();

  ngAfterViewInit(): void {
    // ? root & template projection must exists
    const rootPortal: ElDomT = document.getElementById('root-portal');
    if (!rootPortal || !this.tpl || this.attached) return;

    // ? simple absolute div
    // ! it must not have pointer events
    // ! or will cover other DOM important elements
    const host: HTMLElement = document.createElement('div');
    host.dataset['portalId'] = this.id;
    host.style.position = 'absolute';
    host.style.pointerEvents = 'none';
    host.style.zIndex = '100';
    // host.style.border = '3px solid red';
    host.style.minWidth = '100%';
    host.style.minHeight = '100%';

    rootPortal.appendChild(host);

    // ! each portal can have at most 1 host
    this.outlet = new DomPortalOutlet(host, this.appRef, this.injector);

    const portal: TemplatePortal<unknown> = new TemplatePortal<unknown>(this.tpl, this.vcr);
    // ! each outlet can have at most 1 portal
    this.outlet.attach(portal);
    this.attached = true;

    queueMicrotask((): void => {
      this.contentEl = host.firstElementChild as HTMLElement | null;
      if (!this.contentEl) return;

      this.usePlatform.inCtx((): void => {
        effect((): void => this.applyCoords(this.coords()));
      });
    });
  }

  private applyCoords(coords: Partial<RecCoordsT>): void {
    if (!this.contentEl) return;

    const { top, left, right, bottom } = coords;

    const style: CSSStyleDeclaration = this.contentEl.style;
    style.position = 'absolute';
    style.top = top ?? '';
    style.bottom = bottom ?? '';
    style.left = left ?? '';
    style.right = right ?? '';
  }

  public get portalId(): string {
    return this.id;
  }

  ngOnDestroy(): void {
    if (this.outlet) {
      this.outlet.detach();
      this.outlet.dispose();
      this.outlet = null;
    }

    const host = document.querySelector(`[data-portal-id="${this.id}"]`);
    if (host && host.parentElement) host.parentElement.removeChild(host);

    this.attached = false;
    this.contentEl = null;
  }
}
