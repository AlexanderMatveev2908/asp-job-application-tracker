import { inject, Injectable } from '@angular/core';
import { ApiConfSvc } from '../request/conf/conf';

@Injectable()
export abstract class SideEffectsRootHk {
  protected readonly confApi: ApiConfSvc = inject(ApiConfSvc);
  protected readonly DEF_CLIENT_ERR_MSG: string =
    'A wild Snorlax fall asleep blocking the road 💤. Try later';
}
