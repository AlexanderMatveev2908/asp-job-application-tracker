import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';

export type HttpResT = HttpResponse<unknown> | HttpErrorResponse;

export class ApiShape {
  public static isHttpRes(e: HttpEvent<unknown> | HttpErrorResponse): boolean {
    return e instanceof HttpResponse || e instanceof HttpErrorResponse;
  }
}
