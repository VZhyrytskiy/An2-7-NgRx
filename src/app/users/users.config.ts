import { InjectionToken } from '@angular/core';

const usersBaseUrl = 'http://localhost:3000/users';
export const UsersAPI = new InjectionToken<string>('UsersAPI');

export const UsersAPIProvider = {
    provide: UsersAPI,
    useValue: usersBaseUrl
};
