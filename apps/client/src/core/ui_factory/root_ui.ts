import { WithIdT } from '@/common/types/etc';
import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class RootUiSvc {
  protected withID<T>(arg: T): T & WithIdT {
    return {
      ...arg,
      id: v4(),
    };
  }

  protected arrWithIDs<T>(arg: T[]): (T & WithIdT)[] {
    return arg.map((el: T) => this.withID(el));
  }
}
