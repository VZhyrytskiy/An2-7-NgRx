import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { TsInterceptor } from './ts.interceptor';

// Angular applies interceptors in the order that you provide them.
// If you provide interceptors A, then B, then C,
// requests will flow in A->B->C and responses will flow out C->B->A.
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TsInterceptor,
    multi: true
  }
];
