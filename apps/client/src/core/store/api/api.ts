import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResApiT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class ApiSvc {
  private readonly http: HttpClient = inject(HttpClient);

  private _get<T>(
    endpoint: string,
    paramsArg: Record<string, string> | null
  ): Observable<ResApiT<T>> {
    const params: HttpParams | undefined = paramsArg
      ? new HttpParams({ fromObject: paramsArg })
      : undefined;

    return this.http.get<ResApiT<T>>(`${endpoint}`, {
      params,
    });
  }

  public get<T>(endpoint: string): Observable<ResApiT<T>> {
    return this._get(endpoint, null);
  }
  public getWithParams<T>(
    endpoint: string,
    params: Record<string, string>
  ): Observable<ResApiT<T>> {
    return this._get(endpoint, params);
  }
}
