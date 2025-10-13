import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class RootUiSvc {
  protected withID<T>(arg: T): T & { id: string } {
    return {
      ...arg,
      id: v4(),
    };
  }

  protected arrWithIDs<T>(arg: T[]): (T & { id: string })[] {
    return arg.map((el: T) => this.withID(el));
  }
}
