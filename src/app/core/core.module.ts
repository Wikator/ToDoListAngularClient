import { NgModule, Optional, SkipSelf } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {SnakeCaseInterceptor} from "./interceptors/snake-case.interceptor";
import {NavbarComponent} from "./shell/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {AdminDirective} from "../_directives/admin.directive";
import {AuthDirective} from "../_directives/auth.directive";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    NavbarComponent,
    AdminDirective,
    AuthDirective
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: SnakeCaseInterceptor, multi: true }
],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
