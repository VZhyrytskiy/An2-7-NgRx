import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(delay(1000), tap(val => (this.isLoggedIn = val)));
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
