import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  EffectRef,
  HostListener,
  inject,
  input,
  InputSignal,
  signal,
  Type,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { RecCoordsT, UsePortalSvc } from '@/core/hooks/use_portal';
import { Portal } from '@/layout/portal/portal';
import { RefDomT } from '@/common/types/etc';
import { UsePlatformSvc } from '@/core/hooks/use_platform';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator implements AfterViewInit {
  // ? svc
  private readonly usePortal: UsePortalSvc = inject(UsePortalSvc);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);

  // ? personal optional props
  // ? component may be inside a swapper
  // ? but not necessarily so by default will always receive
  // ? by parent a 0
  public readonly swap: InputSignal<number> = input(0);

  // ? local state
  public readonly isHover: WritableSignal<boolean> = signal(false);
  public readonly coords: WritableSignal<RecCoordsT | null> = signal(null);

  // ? static assets
  public readonly Svg: Type<unknown> = SvgFillPwdGen;

  // ? children
  @ViewChild('btn') btn: RefDomT;

  // ? listeners
  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }

  ngAfterViewInit(): void {
    this.usePlatform.whenDomPainted(() => {
      this.coords.set(this.usePortal.coordsOf(this.btn));
    });
  }

  public optDependencies: EffectRef = effect(() => {
    void this.swap();

    setTimeout(() => {
      this.coords.set(this.usePortal.coordsOf(this.btn));
    }, 500);
  });

  @HostListener('window:scroll')
  public onScroll(): void {
    this.coords.set(this.usePortal.coordsOf(this.btn));
  }
}
