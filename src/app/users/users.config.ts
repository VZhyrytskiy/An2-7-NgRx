import { InjectionToken } from '@angular/core';

export const UsersAPI = new InjectionToken<string>('UsersAPI', {
  providedIn: 'any',
  factory: () => 'http://localhost:3000/users'
});
