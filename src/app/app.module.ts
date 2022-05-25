import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

// add this line if you don't have access to
// index.html and you want to set base tag
// import { APP_BASE_HREF } from '@angular/common';

import { LayoutModule } from './layout/layout.module';
import { TasksModule } from './tasks/tasks.module';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    TasksModule,
    SpinnerModule.forRoot(),
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
