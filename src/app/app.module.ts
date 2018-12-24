import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/Forms';
import { environment } from '../environments/environment';
// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/_parts/menu/menu.component';
import { ListHeaderComponent } from './components/_parts/list-header/list-header.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { ListComponent } from './components/list/list.component';
// services
import { ListService } from './services/list.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
// angular material
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// path guard
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent,
        SignupComponent,
        LoginComponent,
        MenuComponent,
        ListHeaderComponent,
        AddListComponent,
        ListComponent,
        EditListComponent,
    ],

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase, 'done-app-ang'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MaterialModule,
        BrowserAnimationsModule
    ],

    entryComponents: [
        AddListComponent,
        EditListComponent
    ],

    providers: [
        TaskService, 
        ListService, 
        UserService, 
        AuthService, 
        AuthGuard
    ],

    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }