import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  profilePhoto: File;

  constructor(private router: Router) { }

  onFileSelected(profilePhoto: File) {
    this.profilePhoto = profilePhoto;
  }

  onSubmit(form: NgForm) {
    // TODO ADD SERVICE CALL
    console.log(form);
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
