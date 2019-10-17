import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-choice',
  templateUrl: './lang-choice.component.html',
  styleUrls: ['./lang-choice.component.css']
})
export class LangChoiceComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');
  }

  getLangs(): string[] {
    return this.translate.getLangs();
  }

  changeLang(langSelected: string): void {
    localStorage.setItem('lang', langSelected);
    this.translate.use(langSelected);
  }

  ngOnInit() {
  }

}
