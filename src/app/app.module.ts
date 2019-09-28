import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    SigninPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
