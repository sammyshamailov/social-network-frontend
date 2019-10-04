import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css']
})
export class TweetItemComponent implements OnInit {
  @Input() tweet: object;

  constructor(private router: Router) { }

  goToProfilePage() {
    this.router.navigate(['/profile']);
  }

  ngOnInit() {
  }

}
