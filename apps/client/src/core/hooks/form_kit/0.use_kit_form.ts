import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UseNavSvc } from '../use_nav/use_nav';
import { ApiTrackerSvc } from '@/core/store/api/etc/tracker';

@Injectable()
export abstract class UseKitFormSvc extends ApiTrackerSvc {
  // ? expected to be present
  public abstract form: FormGroup;

  // ? svc
  protected readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? helpers
  public readonly getCtrl: (name: string) => FormControl = (name: string) =>
    this.form.get(name) as FormControl;
}
