import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable()
export class UsePaginationHk {
  public readonly page: WritableSignal<number> = signal(0);
  public readonly block: WritableSignal<number> = signal(0);
  public readonly limit: WritableSignal<number> = signal(1);
}
