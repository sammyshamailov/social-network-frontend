import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TweetsComponent } from './components/tweets/tweets.component';
import { TranslateModule } from '@ngx-translate/core';
import { TweetItemComponent } from './components/tweet-item/tweet-item.component';
import { TweetActionsComponent } from './components/tweet-actions/tweet-actions.component';
import { AppMaterialModule } from '../app-material/app-material.module';

@NgModule({
  declarations: [
    TweetsComponent,
    TweetItemComponent,
    TweetActionsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    AppMaterialModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    AppMaterialModule,
    TweetsComponent,
    TranslateModule
  ]
})
export class SharedModule { }
