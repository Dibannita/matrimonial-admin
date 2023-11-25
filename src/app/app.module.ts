import { AuthAdminInterceptor } from './auth-interceptor/auth-admin.interceptor';
import {NgModule} from '@angular/core';
import {BrowserModule, Meta, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    MatIconModule
  ],
  providers: [
    Title,
    Meta,
    {provide: HTTP_INTERCEPTORS, useClass: AuthAdminInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
