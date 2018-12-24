import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
// path guard
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
        path: 'list/:id',
        component: ListComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'singup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'add-list',
        component: AddListComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'edit-list/:id',
        component: EditListComponent,
        canActivate:[AuthGuard]
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }