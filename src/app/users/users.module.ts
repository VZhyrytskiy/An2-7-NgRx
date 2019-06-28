import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';

import { UserComponent } from './components';
import { UsersAPIProvider } from './users.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    UsersServicesModule
  ],
  providers: [UsersAPIProvider],
  declarations: [UsersRoutingModule.components, UserComponent]
})
export class UsersModule {}
