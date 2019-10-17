import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, catchError, share, tap, flatMap } from 'rxjs/operators';
import { Tweet, TweetStars } from '../../shared/models/tweet';
import { environment } from 'src/environments/environment';


@Injectable()
export class TweetService {
  private currentProfileMemberId: string;

  constructor(private http: HttpClient) { }

  setCurrentId(id: string): void {
    this.currentProfileMemberId = id;
  }

  getAllTweets() {
    return timer(0, 10000)
      .pipe(
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/tweets`)
            .pipe(
              tap(tweets => console.log(tweets)),
              catchError(error => throwError(error))
            );
        }));
  }

  getMemberTweets() {
    return timer(0, 10000)
      .pipe(
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/members/${this.currentProfileMemberId}/tweets`)
            .pipe(
              tap(tweets => console.log(tweets)),
              catchError(error => throwError(error))
            );
        }));
  }

  postTweet(tweetContent: string) {
    return this.http.post<Tweet>(`${environment.baseUrl}/tweets`, { text: tweetContent })
      .pipe(
        // map(newTweet => newTweet as Tweet),
        catchError(error => throwError(error))
      );
  }

  deleteTweet(tweetId: string) {
    return this.http.delete(`${environment.baseUrl}/tweets/${tweetId}`)
      .pipe(
        // map(newTweet => newTweet as Tweet),
        catchError(error => throwError(error))
      );
  }

  starTweet(tweetId: string) {
    return this.http.post<TweetStars>(`${environment.baseUrl}/tweets/${tweetId}/star-toggle`, {})
      .pipe(
        // map(newTweet => newTweet as Tweet),
        catchError(error => throwError(error))
      );
  }
}
