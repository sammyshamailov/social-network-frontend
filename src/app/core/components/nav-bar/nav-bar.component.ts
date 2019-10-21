import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  /**
   * returnes whether user is authenticated.
   * get property for html control.
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * returnes the current username of logged in user.
   * get property for profile navigation.
   */
  get loggedUsername(): string {
    return this.authService.getLoggedUsername();
  }

  /**
   * returnes the current user id of logged in user.
   * get property for profile navigation.
   */
  get loggedUserId(): string {
    return this.authService.getLoggedUserId();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * requests logout from authService
   * and navigates back to home.
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
