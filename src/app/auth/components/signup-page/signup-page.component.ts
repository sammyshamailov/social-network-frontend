import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { AppError, BadEmailError, BadPasswordError, EmailExistsError, UsernameExistsError } from '../../../shared/common';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  registerForm: FormGroup;
  get emailForm(): AbstractControl { return this.registerForm.get('email'); }
  get usernameForm(): AbstractControl { return this.registerForm.get('username'); }
  get passwordForm(): AbstractControl { return this.registerForm.get('password'); }
  get avatarForm(): AbstractControl { return this.registerForm.get('avatar'); }
  get avatarNameForm(): AbstractControl { return this.registerForm.get('avatarName'); }

  constructor(
    fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)]],
      avatar: [null],
      avatarName: [null, [Validators.required]]
    });
  }

  /**
   * Function for setting file data on form group.
   * Emits when file is selected in browser.
   * @param profilePhoto The chosen photo for avatar.
   */
  onFileSelected(profilePhoto: File): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(profilePhoto);
    fileReader.onload = () => {
      this.registerForm.patchValue({
        avatar: fileReader.result,
        avatarName: profilePhoto.name
      });
    };
  }

  /**
   * Function for registering new user with form data.
   * If registration is successful, sets token and navigates to home.
   * Else, pops up error and resets the needed fields.
   */
  onSubmit(): void {
    this.authService.register(
      this.avatarForm.value,
      this.avatarNameForm.value,
      this.emailForm.value,
      this.usernameForm.value,
      this.passwordForm.value
    ).subscribe(
      (userDetails) => {
        this.authService.setToken(userDetails.token);
        this.router.navigate(['/home']);
        this.openSnackBar('Registration Succeded');
      },
      (error: AppError) => {
        if (error instanceof UsernameExistsError) {
          this.usernameForm.setValue('');
        } else if (error instanceof EmailExistsError || error instanceof BadEmailError) {
          this.emailForm.setValue('');
        } else if (error instanceof BadPasswordError) {
          this.passwordForm.setValue('');
        }
        error.openSnackBar(this.snackBar);
      }
    );
  }

  /**
   * Opens snack bar with success message.
   * @param successMsg string representation of massage.
   */
  private openSnackBar(successMsg: string) {
    this.snackBar.open(successMsg, 'Close', {
      duration: 2000,
    });
  }

  ngOnInit() {
  }

}
