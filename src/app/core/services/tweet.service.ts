import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TweetService {

  constructor(private http: HttpClient) { }

  postTweet(tweetContent: string) {
    this.http.post('', '');
  }
}
