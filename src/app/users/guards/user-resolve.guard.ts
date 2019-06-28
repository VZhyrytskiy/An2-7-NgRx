import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, finalize, take } from 'rxjs/operators';

import { UserObservableService } from './../services';
import { UserModel } from './../models/user.model';
import { UsersServicesModule } from '../users-services.module';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: UsersServicesModule
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userObservableService: UserObservableService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel | null> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    this.spinner.show();
    const id = +route.paramMap.get('userID');

    return this.userObservableService.getUser(id).pipe(
      delay(2000),
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
