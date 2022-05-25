import { Injectable } from '@angular/core';
import { HttpHeaders, HttpEventType } from '@angular/common/http';
import type {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { type Observable, filter, map } from 'rxjs';

import { interceptorTOKEN } from './../../users';

@Injectable()
export class TsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request Interceptor:`);

    // request interceptor
    const contextValue = req.context.get(interceptorTOKEN);
    console.log('contextValue:', contextValue);

    let clonedRequest;
    if (req.method === 'POST' || (req.method === 'PUT')) {
      console.log('req.method:', req.method);
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'user-token'
        })
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    // response interceptor
    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => {
        // do stuff with response
        if ((event as HttpResponse<any>).url!.includes('users')) {
          console.log('Response Interceptor:');
          console.log(event);
          console.log((event as HttpResponse<any>).body);
        }
        return event;
      })
    );
  }
}
