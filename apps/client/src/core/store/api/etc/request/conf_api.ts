import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfApiT } from '../types';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class ConfApiSvc {
  private readonly conf: BehaviorSubject<Nullable<ConfApiT>> = new BehaviorSubject<
    Nullable<ConfApiT>
  >(null);

  set(conf: ConfApiT): void {
    this.conf.next(conf);
  }

  get(): Nullable<ConfApiT> {
    return this.conf.value;
  }

  obs(): Observable<Nullable<ConfApiT>> {
    return this.conf.asObservable();
  }
}
