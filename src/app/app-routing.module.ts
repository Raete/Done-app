import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';
import { TasksAllComponent } from './components/tasks-all/tasks-all.component';
import { TasksDoneComponent } from './components/tasks-done/tasks-done.component';
import { TasksTodoComponent } from './components/tasks-todo/tasks-todo.component';
import { AddListComponent } from './components/add-list/add-list.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'singup',
        component: SingupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'tasks-all',
        component: TasksAllComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'tasks-done',
        component: TasksDoneComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'tasks-todo',
        component: TasksTodoComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'add-list',
        component: AddListComponent,
        canActivate:[AuthGuard]
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
