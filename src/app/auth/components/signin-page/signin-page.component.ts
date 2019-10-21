import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { AppError, BadCredentialsError } from '../../../shared/common';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Sends the login details to authService and resets form
   *  if credentials are wrong, else sets token and navigates to home.
   * @param form Form data.
   */
  onSubmit(form: NgForm): void {
    this.authService.login(form.value.email, form.value.password).subscribe(
      (userDetails) => {
        this.authService.setToken(userDetails.token);
        this.router.navigate(['/home']);
        this.openSnackBar('Login Successful');
      },
      (error: AppError) => {
        if (error instanceof BadCredentialsError) {
          form.controls.password.setValue('');
          form.controls.email.setValue('');
        }
        error.openSnackBar(this.snackBar);
      }
    );
  }

  /**
   * Opens snack bar with success message.
   * @param successMsg string representation of massage.
   */
  private openSnackBar(successMsg: string): void {
    this.snackBar.open(successMsg, 'Close', {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
