import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'register',
    component: SignupPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: SigninPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
