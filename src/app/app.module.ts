import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { DropdownInputComponent } from './_forms/dropdown-input/dropdown-input.component';
import { SnakeCaseInterceptor } from './_interceptors/snake-case.interceptor';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { AuthDirective } from './_directives/auth.directive';
import { AdminDirective } from './_directives/admin.directive';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { GroupFormComponent } from './groups/group-form/group-form.component';
import { UpdateGroupComponent } from './groups/update-group/update-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    CreateTaskComponent,
    DropdownInputComponent,
    MyTasksComponent,
    GroupListComponent,
    AuthDirective,
    AdminDirective,
    CreateGroupComponent,
    GroupFormComponent,
    UpdateGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SnakeCaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
