import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ConfApiT, HttpMethod } from '../etc/types';
import { inject } from '@angular/core';
import { ConfApiSvc } from '../conf_api';
import { ShapeCheck } from '@/core/lib/data_structure/shape';

export const addConfApiMdw: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const confApi: ConfApiSvc = inject(ConfApiSvc);

  return next(req).pipe(
    map((e: HttpEvent<unknown>) => {
      if (!(e instanceof HttpResponse)) return e;

      let dataSent: Record<string, unknown> | null;
      if (['GET', 'DELETE'].some((str: string) => str === req.method)) dataSent = null;
      else dataSent = req.body as Record<string, unknown> | null;

      const reqParams: HttpParams = req.params;
      const params: Record<string, unknown> = {};
      for (const k of reqParams.keys()) params[k] = reqParams.get(k);

      const urlReq: string = (e.url ?? '').split('?')[0];
      const conf: ConfApiT = {
        url: urlReq,
        method: req.method as HttpMethod,
        responseType: e.headers.get('Content-Type'),
        requestType: req.headers.get('Content-Type'),
        accessToken: e.headers.get('Authorization'),
        params: ShapeCheck.hasObjData(params) ? params : null,
        body: dataSent,
      };

      confApi.set(conf);

      return e;
    })
  );
};
