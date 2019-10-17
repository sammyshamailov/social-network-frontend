import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { Tweet } from '../../models/tweet';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.css']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweet: Tweet;

  @Output() deleteTweetId = new EventEmitter<string>();
  @Output() starTweetId = new EventEmitter<string>();
  @Output() postTweet = new EventEmitter<string>();

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  get isLoggedUser(): boolean {
    return this.authService.getLoggedUsername() === this.tweet.username;
  }

  constructor(private authService: AuthService) { }

  deleteTweet() {
    this.deleteTweetId.emit(this.tweet._id);
  }

  replyTweet() {
    this.postTweet.emit('');
  }

  starTweet() {
    this.starTweetId.emit(this.tweet._id);
  }

  ngOnInit() {
  }

}
