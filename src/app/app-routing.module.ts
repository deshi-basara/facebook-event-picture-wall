import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WallComponent } from './wall/wall.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
    path: 'wall/:eventId',
    component: WallComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full',
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
