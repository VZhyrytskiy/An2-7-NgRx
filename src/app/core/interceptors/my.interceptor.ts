import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request Interceptor:`);

    // request interceptor
    let clonedRequest;
    if (req.url.includes('users')) {
      clonedRequest = req.clone({
        params: new HttpParams().set('ts_interceptor', Date.now().toString())
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    return next.handle(clonedRequest).pipe(
      // response interceptor
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response
          if (event.url.includes('users')) {
            console.log('Response Interceptor:');
            console.log(event);
            console.log(event.body);
          }
          return event;
        }
      })
    );
  }
}
