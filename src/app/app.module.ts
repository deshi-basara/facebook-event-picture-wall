import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './_shared/services/auth.service';
import { EventService } from './_shared/services/event.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WallComponent } from './wall/wall.component';
import { WallDetailComponent } from './wall/wall-detail/wall-detail.component';
import { WallImagesComponent } from './wall/wall-images/wall-images.component';
import { ColumnPipe } from './_shared/pipes/column.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WallComponent,
    WallDetailComponent,
    WallImagesComponent,
    ColumnPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2Webstorage.forRoot({ prefix: 'fb-wall' }),
    FacebookModule.forRoot(),
  ],
  providers: [
    AuthService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
