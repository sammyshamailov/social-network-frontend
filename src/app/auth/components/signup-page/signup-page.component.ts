import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { AppError, BadPasswordError, EmailExistsError, UsernameExistsError } from '../../../shared/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  profilePhoto: File;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelected(profilePhoto: File) {
    this.profilePhoto = profilePhoto;
  }

  onSubmit(form: NgForm) {
    this.authService.register(form.value.email, form.value.username, form.value.password).subscribe(
      (userDetails) => {
        this.authService.setToken(userDetails.token);
        this.router.navigate(['/home']);
      },
      (error: AppError) => {
        if (error instanceof UsernameExistsError) {
          form.controls.username.setValue('');
        } else if (error instanceof EmailExistsError) {
          form.controls.email.setValue('');
        } else if (error instanceof BadPasswordError) {
          form.controls.password.setValue('');
        }
        error.openSnackBar(this.snackBar);
      }
    );
  }

  ngOnInit() {
  }

}
