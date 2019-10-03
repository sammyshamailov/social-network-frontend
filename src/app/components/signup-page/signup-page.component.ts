import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  profilePhoto = new FileReader();
  constructor() { }

  onFileSelected(profilePhoto: File) {
    this.profilePhoto.readAsArrayBuffer(profilePhoto);
  }

  onSubmit(form: NgForm) {
    // TODO ADD SERVICE CALL
    console.log(form);
  }

  ngOnInit() {
  }

}
