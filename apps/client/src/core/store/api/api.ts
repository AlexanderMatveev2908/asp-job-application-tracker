import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ErrApiT, OptToastApiT, ResApiT } from './etc/types';
import { ToastSlice } from '@/features/toast/slice';
import { ConfApiSvc } from './conf_api';
import { ArgsApi } from './requests/args_api';

@Injectable({
  providedIn: 'root',
})
export class ApiSvc {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly confApi: ConfApiSvc = inject(ConfApiSvc);

  // ? 🎨 toast
  private defOptToast(): OptToastApiT {
    return {
      toastErr: true,
      toastOk: this.confApi.get()?.method !== 'GET',
    };
  }

  private withToast<T>(
    cb: Observable<ResApiT<T>>,
    opt: OptToastApiT | null
  ): Observable<ResApiT<T>> {
    const options: OptToastApiT = opt ?? this.defOptToast();

    return cb.pipe(
      tap({
        next: (res: ResApiT<T>) => {
          if (!options.toastOk) return;

          this.toastSlice.openToast({
            eventT: 'OK',
            msg: res.msg,
            status: res.status,
          });
        },
        error: (res: ErrApiT<T>) => {
          if (!options.toastErr) return;

          this.toastSlice.openToast({
            eventT: 'ERR',
            msg: res.error.msg,
            status: res.status,
          });
        },
      })
    );
  }

  // ? 🚦 request handlers
  public get<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.withToast(
      this.http.get<ResApiT<T>>(args.getUrl(), {
        params: args.getParams(undefined)!,
      }),
      args.getOptToast()
    );
  }

  public delete<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.withToast(
      this.http.delete<ResApiT<T>>(args.getUrl(), {
        params: args.getParams(undefined)!,
      }),
      args.getOptToast()
    );
  }

  public post<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.withToast(
      this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()).pipe(),
      args.getOptToast()
    );
  }

  public put<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.withToast(
      this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args.getOptToast()
    );
  }

  public patch<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.withToast(
      this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions()),
      args.getOptToast()
    );
  }
}
