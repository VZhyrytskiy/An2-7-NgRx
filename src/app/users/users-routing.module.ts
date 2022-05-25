import { NgModule } from '@angular/core';
import { type Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserListComponent, UserFormComponent } from './components';
import { UserResolveGuard } from './guards';
import { CanDeactivateGuard } from './../core';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:userID',
        component: UserFormComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserResolveGuard
        }
      },
      {
        path: '',
        component: UserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
  static components = [UsersComponent, UserListComponent, UserFormComponent];
}
