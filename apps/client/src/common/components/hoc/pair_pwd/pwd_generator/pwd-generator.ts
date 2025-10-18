import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  Type,
  WritableSignal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgFillPwdGen } from '@/common/components/svgs/fill/pwd_gen/pwd-gen';
import { UsePortalSvc } from '@/core/hooks/use_portal';
import { Portal } from '@/layout/portal/portal';

@Component({
  selector: 'app-pwd-generator',
  imports: [NgComponentOutlet, Portal],
  templateUrl: './pwd-generator.html',
  styleUrl: './pwd-generator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PwdGenerator {
  private readonly usePortal: UsePortalSvc = inject(UsePortalSvc);

  public readonly isHover: WritableSignal<boolean> = signal(false);

  public readonly Svg: Type<unknown> = SvgFillPwdGen;

  public onHover(): void {
    this.isHover.set(true);
  }
  public onLeave(): void {
    this.isHover.set(false);
  }
}
