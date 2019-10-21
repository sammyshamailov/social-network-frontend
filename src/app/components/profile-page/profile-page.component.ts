import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { TweetService } from '../../core/services/tweet.service';
import { AppError } from '../../shared/common';
import { Tweet } from '../../shared/models/tweet';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  userDetails: User;

  idSubscription: Subscription;
  profileId: string;

  tweetsSubscription: Subscription;
  tweets: Tweet[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tweetService: TweetService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Returns the user avatar for ngStyle in mat-card-avatar.
   * @param user The selected user for profile.
   * @returns Background image properties.
   */
  getUserAvatar(user: User) {
    const userAvatar = {
      'background-image': `url(${user.avatarUrl})`,
      'background-size': 'cover'
    };
    return userAvatar;
  }

  ngOnInit() {
    this.idSubscription = this.route.paramMap.subscribe(params => {
      this.profileId = params.get('id');
      // set the current profile id for control.
      this.tweetService.currentProfileId = this.profileId;
      this.authService.getMember(this.profileId).subscribe(
        user => {
          this.userDetails = user;
        },
        (error: AppError) => {
          // in case of wrong id or wrong username.
          this.router.navigate(['home']);
          error.openSnackBar(this.snackBar);
        }
      );
      this.tweetsSubscription = this.tweetService.getMemberTweets(this.profileId)
        .subscribe(
          (tweets) => {
            if (params.get('id') === this.tweetService.currentProfileId) { this.tweets = tweets; }
          },
          (error: AppError) => {
            error.openSnackBar(this.snackBar);
          });
    });
  }

  ngOnDestroy() {
    this.idSubscription.unsubscribe();
    this.tweetsSubscription.unsubscribe();
  }

}
