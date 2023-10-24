import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { DropdownInputComponent } from './_forms/dropdown-input/dropdown-input.component';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { GroupFormComponent } from './groups/group-form/group-form.component';
import { UpdateGroupComponent } from './groups/update-group/update-group.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { UpdateTaskComponent } from './tasks/update-task/update-task.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { SubmitButtonComponent } from './_forms/submit-button/submit-button.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectFormComponent } from './subjects/subject-form/subject-form.component';
import { CreateSubjectComponent } from './subjects/create-subject/create-subject.component';
import { UpdateSubjectComponent } from './subjects/update-subject/update-subject.component';
import {CoreModule} from "./core/core.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    LoginComponent,
    RegisterComponent,

    TextInputComponent,
    DropdownInputComponent,
    SubmitButtonComponent,

    MyTasksComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    TaskFormComponent,

    GroupListComponent,
    CreateGroupComponent,
    UpdateGroupComponent,
    GroupFormComponent,

    CategoryListComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CategoryFormComponent,

    SubjectListComponent,
    CreateSubjectComponent,
    UpdateSubjectComponent,
    SubjectFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
