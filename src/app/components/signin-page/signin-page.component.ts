import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  constructor(private router: Router) { }

  onSubmit(form: NgForm) {
    // TODO ADD SERVICE CALL
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
