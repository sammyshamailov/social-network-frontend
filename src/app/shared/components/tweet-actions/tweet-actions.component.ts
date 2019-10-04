import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.css']
})
export class TweetActionsComponent implements OnInit {
  @Input() tweet: object;

  constructor() { }

  deleteTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  replyTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  starTweet(tweet: object) {
    // TODO call api service
    console.log(tweet);
  }

  ngOnInit() {
  }

}
