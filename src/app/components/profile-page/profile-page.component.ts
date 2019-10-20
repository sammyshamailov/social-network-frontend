import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/user';
import { AppError } from 'src/app/shared/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Tweet } from 'src/app/shared/models/tweet';
import { TweetService } from 'src/app/core/services/tweet.service';

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
      this.tweetService.currentProfileId = this.profileId;
      this.authService.getMember(this.profileId).subscribe(
        user => {
          this.userDetails = user;
        },
        (error: AppError) => {
          this.router.navigate(['home']);
          error.openSnackBar(this.snackBar);
        }
      );
      this.tweetsSubscription = this.tweetService.getMemberTweets(this.profileId)
        .subscribe(
          (tweets) => {
            console.log(tweets);
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
