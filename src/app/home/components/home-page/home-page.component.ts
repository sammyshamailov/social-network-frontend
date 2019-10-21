import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { TweetService } from '../../../core/services/tweet.service';
import { Tweet } from '../../../shared/models/tweet';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  tweetsSubscription: Subscription;
  tweets: Tweet[] = [];

  /**
   * Returnes whether user is authenticated.
   * Function for html control.
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(
    private authService: AuthService,
    private tweetService: TweetService
  ) { }

  ngOnInit() {
    this.tweetsSubscription = this.tweetService.getAllTweets()
      .subscribe(
        (tweets) => {
          this.tweets = tweets;
        });
  }

  ngOnDestroy() {
    this.tweetsSubscription.unsubscribe();
  }

}
