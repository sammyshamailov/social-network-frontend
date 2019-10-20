import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppMaterialModule } from '../app-material/app-material.module';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { ReplyComponent } from './components/reply/reply.component';
import { TweetActionsComponent } from './components/tweet-actions/tweet-actions.component';
import { TweetItemComponent } from './components/tweet-item/tweet-item.component';
import { TweetsComponent } from './components/tweets/tweets.component';

@NgModule({
  declarations: [
    TweetsComponent,
    TweetItemComponent,
    TweetActionsComponent,
    DeleteConfirmComponent,
    ReplyComponent
  ],
  entryComponents: [
    ReplyComponent,
    DeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TweetsComponent,
    TranslateModule
  ]
})
export class SharedModule { }
