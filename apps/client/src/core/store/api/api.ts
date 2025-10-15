import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ToastOptApiT, ResApiT, HttpMethod } from './etc/types';
import { ToastSlice } from '@/features/toast/slice';
import { ApiShape } from './etc/api_shape';
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

  public defOptToast(method: HttpMethod | undefined): ToastOptApiT {
    return {
      toastErr: true,
      toastOk: method !== 'GET',
    };
  }

  private withToast<T>(
    cb: Observable<ResApiT<T>>,
    opt: ToastOptApiT | null
  ): Observable<ResApiT<T>> {
    return cb.pipe(
      map((res: ResApiT<T>) => {
        const options: ToastOptApiT = opt ?? this.defOptToast(this.confApi.get()?.method);
        const isOk: boolean = ApiShape.isResOk(res.status);

        if ((isOk && !options.toastOk) || (!isOk && !options.toastErr)) return res;

        this.toastSlice.openToast({
          eventT: ApiShape.appEventByStatus(res.status),
          msg: res.msg,
          status: res.status,
        });
        return res;
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
    return this.http.delete<ResApiT<T>>(args.getUrl(), {
      params: args.getParams(undefined)!,
    });
  }

  public post<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.http.post<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions());
  }

  public put<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.http.put<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions());
  }

  public patch<T>(args: ArgsApi): Observable<ResApiT<T>> {
    return this.http.patch<ResApiT<T>>(args.getUrl(), args.getBody(), args.httpOptions());
  }
}
