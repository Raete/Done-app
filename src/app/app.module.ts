import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SingupComponent } from './components/singup/singup.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/_parts/menu/menu.component';
import { ListHeaderComponent } from './components/_parts/list-header/list-header.component';
import { TasksAllComponent } from './components/tasks-all/tasks-all.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { TasksDoneComponent } from './components/tasks-done/tasks-done.component';
import { TasksTodoComponent } from './components/tasks-todo/tasks-todo.component';

import { ListService } from './services/list.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SingupComponent,
    LoginComponent,
    MenuComponent,
    ListHeaderComponent,
    TasksAllComponent,
    AddListComponent,
    TasksDoneComponent,
    TasksTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'done-app-ang'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [ListService, UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
