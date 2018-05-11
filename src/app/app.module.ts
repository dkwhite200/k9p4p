//This module page basically imports all of our dependecies amoungst the angular/bootstrap/angularfirestor/local files.
//basically used so that when I call a component or library it can be used

//these import the various modules/services/components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { CreateItemComponent } from './item/create-item/create-item.component'
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { DetailItemComponent } from './item/detail-item/detail-item.component';
import { DetailClientComponent } from './client/detail-client/detail-client.component';
import { ItemService } from './item/item.service';


@NgModule({
  //declare the components
  declarations: [
    AppComponent,
    ItemComponent,
    ClientComponent,
    UserComponent,
    DashboardComponent,
    LoginComponent,
    CreateItemComponent,
    EditItemComponent,
    CreateClientComponent,
    EditClientComponent,
    DetailItemComponent,
    DetailClientComponent,
  ],
  //these are components that are within other components; they are "special"
  entryComponents: [
    EditClientComponent,
    CreateClientComponent,
    EditItemComponent,
    CreateItemComponent
  ],
  //these are used for modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  //these are our services
  providers: [
    AuthService,
    AuthGuard,
    ItemService
  ],
  //this defines our initial component (top tier component)
  bootstrap: [AppComponent]
})
export class AppModule { }
