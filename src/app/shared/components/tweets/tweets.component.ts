import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TweetService } from '../../../core/services/tweet.service';
import { AppError } from '../../common';
import { Tweet } from '../../models/tweet';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {

  // Input from profile page or home.
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

  /**
   * Sends request to tweetService for deleting a tweet
   * after user confirms delete action.
   * @param tweetId the desired tweet id for delete.
   */
  deleteTweet(tweetId: string): void {
    // open dialog and subscribe to afterClosed event.
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(userChoice => {
      // enter if user confirms delete
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

  /**
   * Sends request to tweetService for replying to tweet
   * after user writes tweet content and presses post.
   */
  replyTweet(): void {
    this.dialog.open(ReplyComponent).afterClosed().subscribe(answer => {
      // enter if user presses post with tweet text.
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

  /**
   * Sends request to tweetService for star-toggle to tweet
   * @param tweetId the desired tweet id for star-toggle.
   */
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
    // subscribe if tweets component is created in profile page.
    // The purpose of subscription is for controlling whether new tweet
    // should be showen on profile page.
    if (this.router.url.includes('profile')) {
      this.idSubscription = this.route.paramMap.subscribe(params => {
        this.profileId = params.get('id');
      });
    }

    this.newTweetSubscription = this.tweetService.newTweet.subscribe(
      newTweet => {
        // add the tweet reply if the profile page is of
        // the logged in user or current page is home.
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
