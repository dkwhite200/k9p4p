import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ClientComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
