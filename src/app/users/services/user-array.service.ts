import { Injectable } from '@angular/core';

// rxjs
import { EMPTY, Observable, of, throwError, catchError, switchMap } from 'rxjs';

import { UserModel } from './../models/user.model';

const userList: Array<UserModel> = [
  new UserModel(1, 'Anna', 'Borisova'),
  new UserModel(2, 'Boris', 'Vlasov'),
  new UserModel(3, 'Gennadiy', 'Dmitriev')
];

const userListObservable: Observable<Array<UserModel>> = of(userList);

@Injectable({
  providedIn: 'any'
})
export class UserArrayService {
  users$: Observable<UserModel[]> = userListObservable;

  getUser(id: NonNullable<UserModel['id']> | string): Observable<UserModel> {
    return this.users$.pipe(
      switchMap((users: Array<UserModel>) => {
        const user = users.find(user => user.id === +id);
        return user ? of(user) : EMPTY;
      }),
      catchError(err => throwError(() => 'Error in getUser method'))
    );
  }

  createUser(user: UserModel): void {
    userList.push(user);
  }

  updateUser(user: UserModel): void {
    const i = userList.findIndex(u => u.id === user.id);

    if (i > -1) {
      userList.splice(i, 1, user);
    }
  }
}
