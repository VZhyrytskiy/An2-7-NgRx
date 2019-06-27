import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { UserModel } from './../models/user.model';
import { UsersAPI } from './../users.config';
import { UsersServicesModule } from '../users-services.module';

@Injectable({
  providedIn: UsersServicesModule
})
export class UserObservableService {
  constructor(
    private http: HttpClient,
    @Inject(UsersAPI) private usersUrl: string
  ) {}

  getUsers(): Observable<UserModel[]> {
    return this.http
      .get<UserModel[]>(this.usersUrl)
      .pipe(catchError(this.handleError));
  }

  getUser(id: number): Observable<UserModel> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<UserModel>(url).pipe(catchError(this.handleError));
  }

  updateUser(user: UserModel): Observable<UserModel> {
    const url = `${this.usersUrl}/${user.id}`,
      body = JSON.stringify(user),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http
      .put<UserModel>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  createUser(user: UserModel): Observable<UserModel> {
    const url = this.usersUrl,
      body = JSON.stringify(user),
      options = {
        // можно передавать объект конструктору, а можно вызывать метод set
        // приэтом класс является immutable, каждый раз возвращается новый инстанс.
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'my-auth-key'),

        // добавление URL Query параметров: this.usersUrl?id=3
        params: new HttpParams().set('id', '3')
      };

    return this.http
      .post<UserModel>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  deleteUser(user: UserModel): Observable<UserModel[]> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete(url).pipe(concatMap(() => this.getUsers()));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
