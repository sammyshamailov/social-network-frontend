import { NgModule } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    HomePageComponent,
    TextBoxComponent
  ],
  imports: [
    SharedModule,
    TranslateModule
  ]
})
export class HomeModule { }
