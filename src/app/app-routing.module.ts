import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { authGuard } from './_guards/auth.guard';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { adminGuard } from './_guards/admin.guard';
import {CreateGroupComponent} from "./groups/create-group/create-group.component";
import {UpdateGroupComponent} from "./groups/update-group/update-group.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks/create', component: CreateTaskComponent, canActivate: [authGuard] },
  { path: 'tasks/my-tasks', component: MyTasksComponent, canActivate: [authGuard] },
  { path: 'groups', component: GroupListComponent, canActivate: [adminGuard] },
  { path: 'groups/create', component: CreateGroupComponent, canActivate: [adminGuard] },
  { path: 'groups/:id', component: UpdateGroupComponent, canActivate: [adminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
