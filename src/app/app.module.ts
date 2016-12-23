import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2Webstorage } from 'ng2-webstorage';

import { AppComponent } from './app.component';
import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';

/**
 * Routes
 */
const appRoutes :Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: WallComponent
  },
  {
    path: '**',
    component: WallComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WallComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    Ng2Webstorage,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
