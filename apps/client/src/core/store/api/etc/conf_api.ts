import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfApiT } from './types';

@Injectable({
  providedIn: 'root',
})
export class ConfApiSvc {
  private readonly conf: BehaviorSubject<ConfApiT | null> = new BehaviorSubject<ConfApiT | null>(
    null
  );

  set(conf: ConfApiT): void {
    this.conf.next(conf);
  }

  get(): ConfApiT | null {
    return this.conf.value;
  }

  obs(): Observable<ConfApiT | null> {
    return this.conf.asObservable();
  }
}
