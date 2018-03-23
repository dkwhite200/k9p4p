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


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ClientComponent,
    UserComponent,
    DashboardComponent,
    LoginComponent
  ],
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
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
