import { Directive, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { UseFieldRoot } from './0.use_field_root';
import { ErrsFieldT, RecErrsFieldT } from '@/common/types/forms';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class UseFieldErr extends UseFieldRoot implements OnInit {
  // ? derived
  public recErrs: WritableSignal<RecErrsFieldT> = signal({
    prev: null,
    curr: null,
  });

  // ? ng
  ngOnInit(): void {
    this.setup(() => {
      effect(() => {
        const c: FormControl = this.ctrl();
        void this.val();

        const errors: ErrsFieldT = c.errors as ErrsFieldT;

        this.recErrs.update((prev: RecErrsFieldT) => ({
          prev: prev.curr,
          curr: errors?.zod && this.interacted() ? errors.zod : null,
        }));
      });
    });
  }
}
