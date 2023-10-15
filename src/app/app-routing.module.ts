import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { authGuard } from './_guards/auth.guard';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks/create', component: CreateTaskComponent, canActivate: [authGuard] },
  { path: 'tasks/my-tasks', component: MyTasksComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
