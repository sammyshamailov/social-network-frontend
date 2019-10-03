import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TweetsComponent } from './components/tweets/tweets.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    SigninPageComponent,
    HomePageComponent,
    TweetsComponent,
    TextBoxComponent,
    ProfilePageComponent
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
