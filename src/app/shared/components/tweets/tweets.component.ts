import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';
import { TweetService } from '../../../core/services/tweet.service';
import { Subscription } from 'rxjs';
import { AppError } from '../../common';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  @Input() pagePlacing: string;
  tweets: Tweet[] = [];
  subscription: Subscription;

  constructor(private tweetService: TweetService) { }

  deleteTweet(tweetId: string): void {
    this.tweetService.deleteTweet(tweetId).subscribe(
      answer => {
        const deleteTweetIndex: number = this.tweets.findIndex(tweet => tweet._id === tweetId);
        this.tweets.splice(deleteTweetIndex, 1);
      },
      (error: AppError) => {

      }
    );
  }

  replyTweet() {
    // this.tweetService.postTweet()
  }

  starTweet(tweetId: string): void {
    this.tweetService.starTweet(tweetId).subscribe(
      (tweetStars) => {
        const starTweetIndex: number = this.tweets.findIndex(tweet => tweet._id === tweetId);
        const starTweet: Tweet = this.tweets.find(tweet => tweet._id === tweetId);
        starTweet.stars = tweetStars.stars;
        starTweet.starredByMe = tweetStars.starredByMe;
        this.tweets[starTweetIndex] = starTweet;
      },
      (error: AppError) => {

      }
    );
  }

  ngOnInit() {
    // TODO call tweets service with input
    if (this.pagePlacing === 'home') {
      this.subscription = this.tweetService.getAllTweets()
        .subscribe(
          (tweets) => {
            this.tweets = tweets;
          });
    } else {
      this.subscription = this.tweetService.getMemberTweets()
        .subscribe(
          (tweets) => {
            this.tweets = tweets;
          });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
