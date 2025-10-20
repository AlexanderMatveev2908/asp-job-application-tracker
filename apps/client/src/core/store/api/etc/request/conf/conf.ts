import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { ConfApiT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class ApiConfSvc {
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
