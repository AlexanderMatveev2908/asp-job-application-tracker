import { WithIdT } from '@/common/types/etc';
import { v4 } from 'uuid';

export class RootUiFkt {
  protected static withID<T>(arg: T): T & WithIdT {
    return {
      ...arg,
      id: v4(),
    };
  }

  protected static arrWithIDs<T>(arg: T[]): (T & WithIdT)[] {
    return arg.map((el: T) => this.withID(el));
  }
}
