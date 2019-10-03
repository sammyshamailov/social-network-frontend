import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  constructor() { }

  onSubmit(form: NgForm) {
    // TODO ADD SERVICE CALL
  }

  ngOnInit() {
  }

}
