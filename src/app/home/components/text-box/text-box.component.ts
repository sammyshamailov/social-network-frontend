import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../../core/services/tweet.service';
import { AppError } from '../../../shared/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  tweetContent = '';

  constructor(
    private tweetService: TweetService,
    private snackBar: MatSnackBar
    ) { }

  postTweet(): void {
    this.tweetService.postTweet(this.tweetContent).subscribe(
      tweet => {
        // Nothing todo, logic in service.
        // In request pipe, behaviorSubject emits new tweet.
        this.tweetContent = '';
      },
      (error: AppError) => {
        // If user tries to post a tweet that exceeds length limit with fiddler e.g.
        error.openSnackBar(this.snackBar);
      });
  }

  ngOnInit() {
  }

}
