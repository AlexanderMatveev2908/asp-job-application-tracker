import { WithIdT } from '@/common/types/etc';
import { v4 } from 'uuid';

export class RootUiCls {
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
