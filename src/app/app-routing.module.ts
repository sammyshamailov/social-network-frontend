import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'profile/:id/:username',
    component: ProfilePageComponent
  },
  {
    path: '**',
    component: ErrorNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
