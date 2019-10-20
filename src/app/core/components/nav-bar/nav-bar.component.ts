import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get loggedUsername(): string {
    return this.authService.getLoggedUsername();
  }

  get loggedUserId(): string {
    return this.authService.getLoggedUserId();
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  navigate() {
    this.router.navigate(['/profile', this.loggedUserId, this.loggedUsername]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
