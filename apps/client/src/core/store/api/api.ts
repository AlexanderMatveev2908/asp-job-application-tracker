import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiArgs } from './etc/request/args';
import { ObsResT, ResApiT } from './etc/types';
import { Opt } from '@/common/types/etc';
import { SideEffectsMng } from './etc/side_effects/4.final';

@Injectable({
  providedIn: 'root',
})
export class ApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventsMng: SideEffectsMng = inject(SideEffectsMng);

  // ? 🚦 request handlers
  public get<T>(args: ApiArgs): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Opt<HttpParams>,
      }),
      args
    );
  }

  public post<T>(args: ApiArgs): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args
    );
  }

  public put<T>(args: ApiArgs): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public patch<T>(args: ApiArgs): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public delete<T>(args: ApiArgs): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Opt<HttpParams>,
      }),
      args
    );
  }
}
