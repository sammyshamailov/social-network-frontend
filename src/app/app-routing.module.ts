import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'register', component: SignupPageComponent },
  { path: 'login', component: SigninPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
