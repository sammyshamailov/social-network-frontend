import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../shared/shared.module';
import { LangChoiceComponent } from './components/lang-choice/lang-choice.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    NavBarComponent,
    LangChoiceComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    NavBarComponent,
    RouterModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import core modules in AppModule only.`);
    }
  }
}
