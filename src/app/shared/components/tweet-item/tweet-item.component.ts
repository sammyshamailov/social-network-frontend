import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from '../../models/tweet';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.css']
})
export class TweetItemComponent implements OnInit {
  @Input() tweet: Tweet;

  // Outputs for emitting action to parent component.
  @Output() deleteTweetId = new EventEmitter<string>();
  @Output() starTweetId = new EventEmitter<string>();
  @Output() postTweet = new EventEmitter<string>();

  constructor(private router: Router) { }

  /**
   * Returns the user avatar for ngStyle in mat-card-avatar.
   * @param tweet a tweet for avatarUrl.
   * @returns Background image properties.
   */
  getUserAvatar(tweet: Tweet) {
    const userAvatar = {
      'background-image': `url(${tweet.avatarUrl})`,
      'background-size': 'cover'
    };
    return userAvatar;
  }

  /**
   * Navigates to profile page when pressing on user avatar.
   */
  goToProfilePage(): void {
    this.router.navigate(['profile', this.tweet.userId, this.tweet.username]);
  }

  /**
   * emits delete action to parent component with id.
   */
  deleteTweet(tweetId: string): void {
    this.deleteTweetId.emit(tweetId);
  }

  /**
   * emits reply action to parent component.
   */
  replyTweet(): void {
    this.postTweet.emit('');
  }

  /**
   * emits star action to parent component with id.
   */
  starTweet(tweetId: string): void {
    this.starTweetId.emit(tweetId);
  }

  ngOnInit() {
  }

}
