import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArgsApi } from './requests/args_api';
import { EventsMngSvc } from './etc/events_mng';
import { ObsResT, ResApiT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class ApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventsMng: EventsMngSvc = inject(EventsMngSvc);

  // ? 🚦 request handlers
  public get<T>(args: ArgsApi): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParams(undefined)!,
      }),
      args
    );
  }

  public post<T>(args: ArgsApi): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args
    );
  }

  public put<T>(args: ArgsApi): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public patch<T>(args: ArgsApi): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public delete<T>(args: ArgsApi): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParams(undefined)!,
      }),
      args
    );
  }
}
