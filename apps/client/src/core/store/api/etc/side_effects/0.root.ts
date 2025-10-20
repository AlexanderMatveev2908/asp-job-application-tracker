import { inject, Injectable } from '@angular/core';
import { ConfApiSvc } from '../request/conf_api';

@Injectable()
export abstract class SideEffectsRoot {
  protected readonly confApi: ConfApiSvc = inject(ConfApiSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}
