import { inject, Injectable, Signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UseNavSvc } from '../use_nav/use_nav';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

@Injectable()
export abstract class UseKitFormSvc {
  // ? expected to be present
  public abstract form: FormGroup;

  // ? svc
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);
  protected readonly tracker: ApiTrackerSvc = inject(ApiTrackerSvc);

  // ? derived
  public readonly isPending: Signal<boolean> = this.tracker.isPending;

  // ? helpers
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form.get(name) as FormControl;
}
