import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  AboutComponent,
  MessagesComponent,
  LoginComponent,
  PathNotFoundComponent
} from './components';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    LoginComponent,
    MessagesComponent
  ]
})
export class LayoutModule {}
