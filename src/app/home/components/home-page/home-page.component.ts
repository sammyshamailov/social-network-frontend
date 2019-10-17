import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
