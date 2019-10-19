import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { TweetService } from 'src/app/core/services/tweet.service';
import { Tweet } from 'src/app/shared/models/tweet';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  tweetsSubscription: Subscription;
  tweets: Tweet[] = [];

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
