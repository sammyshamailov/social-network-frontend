import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { Tweet } from '../../models/tweet';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.css']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweet: Tweet;
  // variable that holds current starredByMe state for UX.
  starOption = '';

  // Outputs for emitting action to parent component.
  @Output() deleteTweetId = new EventEmitter<string>();
  @Output() starTweetId = new EventEmitter<string>();
  @Output() postTweet = new EventEmitter<string>();

  /**
   * Returnes whether user is authenticated.
   * get property for html visibility control.
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Returnes true if the tweet is posted by
   * logged in user, false otherwise.
   * Helper propery for delete post action visibility.
   */
  get isLoggedUser(): boolean {
    return this.authService.getLoggedUsername() === this.tweet.username;
  }

  constructor(private authService: AuthService) { }

  /**
   * emits delete action to parent component with id.
   */
  deleteTweet(): void {
    this.deleteTweetId.emit(this.tweet._id);
  }

  /**
   * emits reply action to parent component.
   */
  replyTweet(): void {
    this.postTweet.emit('');
  }

  /**
   * emits star action to parent component with id.
   * sets the right state for UX.
   */
  starTweet(): void {
    this.starTweetId.emit(this.tweet._id);
    this.starOption = this.tweet.starredByMe ? 'star_border' : 'star';
  }

  ngOnInit() {
    // initial starredByMe state for UX.
    this.starOption = this.tweet.starredByMe ? 'star' : 'star_border';
  }

}
