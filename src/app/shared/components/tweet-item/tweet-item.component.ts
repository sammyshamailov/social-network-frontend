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
  @Output() deleteTweetId = new EventEmitter<string>();
  @Output() starTweetId = new EventEmitter<string>();
  @Output() postTweet = new EventEmitter<string>();

  constructor(private router: Router) { }

  goToProfilePage() {
    this.router.navigate(['profile', this.tweet.userId, this.tweet.username]);
  }

  deleteTweet(tweetId: string) {
    this.deleteTweetId.emit(tweetId);
  }

  replyTweet() {
    this.postTweet.emit('');
  }

  starTweet(tweetId: string) {
    this.starTweetId.emit(tweetId);
  }

  ngOnInit() {
  }

}
