import { Component, OnInit } from '@angular/core';
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent implements OnInit {
  tweetContent = '';

  constructor(private tweetService: TweetService) { }

  postTweet() {
    this.tweetService.postTweet(this.tweetContent);
    this.tweetContent = '';
  }

  ngOnInit() {
  }

}
