import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ObsResT, ResApiT } from './etc/types';
import { Opt } from '@/common/types/etc';
import { UseApiSideEffectsSvc } from './etc/services/use_api_side_effects/4.final';
import { LibApiArgs } from './etc/lib/req_args/args';

@Injectable({
  providedIn: 'root',
})
export class UseApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly eventsMng: UseApiSideEffectsSvc = inject(UseApiSideEffectsSvc);

  // ? 🚦 request handlers
  public get<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Opt<HttpParams>,
      }),
      args
    );
  }

  public post<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args
    );
  }

  public put<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public patch<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args
    );
  }

  public delete<T, K>(args: LibApiArgs<K>): ObsResT<T> {
    return this.eventsMng.mng(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParamsOr(undefined) as Opt<HttpParams>,
      }),
      args
    );
  }
}
