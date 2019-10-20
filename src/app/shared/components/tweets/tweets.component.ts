import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TweetService } from '../../../core/services/tweet.service';
import { AppError } from '../../common';
import { Tweet } from '../../models/tweet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  @Input() tweets: Tweet[] = [];
  newTweetSubscription: Subscription;
  idSubscription: Subscription;
  tweetsSubscription: Subscription;
  profileId: string;

  constructor(
    private tweetService: TweetService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  deleteTweet(tweetId: string): void {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(userChoice => {
      if (userChoice === 'yes') {
        this.tweetService.deleteTweet(tweetId).subscribe(
          answer => {
            const deleteTweetIndex: number = this.tweets.findIndex(tweet => tweet._id === tweetId);
            this.tweets.splice(deleteTweetIndex, 1);
          },
          (error: AppError) => {
            error.openSnackBar(this.snackBar);
          }
        );
      }
    });
  }

  replyTweet() {
    this.dialog.open(ReplyComponent).afterClosed().subscribe(answer => {
      if (answer !== 'no') {
        this.tweetService.postTweet(answer).subscribe(
          newTweet => {
            // new tweet is being added within the subscription of new tweet.
          },
          (error: AppError) => {
            // If user tries to post a tweet that exceeds length limit with fiddler e.g.
            error.openSnackBar(this.snackBar);
          });
      }
    });
  }

  starTweet(tweetId: string): void {
    this.tweetService.starTweet(tweetId).subscribe(
      (tweetStars) => {
        const starTweet: Tweet = this.tweets.find(tweet => tweet._id === tweetId);
        starTweet.stars = tweetStars.stars;
        starTweet.starredByMe = tweetStars.starredByMe;
      },
      (error: AppError) => {
        error.openSnackBar(this.snackBar);
      }
    );
  }

  ngOnInit(): void {
    if (this.router.url.includes('profile')) {
      this.idSubscription = this.route.paramMap.subscribe(params => {
        this.profileId = params.get('id');
      });
    }

    this.newTweetSubscription = this.tweetService.newTweet.subscribe(
      newTweet => {
        if (newTweet && (this.router.url.includes('home') || newTweet.userId === this.profileId)) {
          this.tweets.splice(0, 0, newTweet);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.idSubscription) { this.idSubscription.unsubscribe(); }
    this.newTweetSubscription.unsubscribe();
  }

}
