import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, flatMap, share } from 'rxjs/operators';
import { Tweet, TweetStars } from '../../shared/models/tweet';
import { environment } from '../../../environments/environment';
import { ErrorTypes } from '../../shared/models/error-types';
import {
  AppError,
  NoMemberError,
  BadIdError,
  NoTweetError,
  BadInputError,
  NotOwnerError
} from '../../shared/common';

@Injectable()
export class TweetService {

  // tslint:disable-next-line: variable-name
  private _newTweet: BehaviorSubject<Tweet> = new BehaviorSubject<Tweet>(null);
  public readonly newTweet: Observable<Tweet> = this._newTweet.asObservable();

  public currentProfileId = '';

  constructor(private http: HttpClient) { }

  getAllTweets() {
    return timer(0, 10000)
      .pipe(
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/tweets`)
            .pipe(
              catchError(this.handleError)
            );
        }));
  }

  getMemberTweets(memberId: string) {
    return timer(0, 10000)
      .pipe(
        share(),
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/members/${memberId}/tweets`)
            .pipe(
              catchError(this.handleError)
            );
        }));
  }

  postTweet(tweetContent: string) {
    return this.http.post<Tweet>(`${environment.baseUrl}/tweets`, { text: tweetContent })
      .pipe(
        tap(newTweet => this._newTweet.next(newTweet)),
        catchError(this.handleError)
      );
  }

  deleteTweet(tweetId: string) {
    return this.http.delete(`${environment.baseUrl}/tweets/${tweetId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  starTweet(tweetId: string) {
    return this.http.post<TweetStars>(`${environment.baseUrl}/tweets/${tweetId}/star-toggle`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) {
      if (error.error === ErrorTypes.noMember) {
        return throwError(new NoMemberError(error.status, error.error));
      } else {
        return throwError(new NoTweetError(error.status, error.error));
      }
    }
    if (error.status === 400) {
      if (error.error === ErrorTypes.badIdFormat) {
        return throwError(new BadIdError(error.status, error.error));
      } else {
        return throwError(new BadInputError(error.status, ErrorTypes.tweetNotFound));
      }
    }
    if (error.status === 403) {
      return throwError(new NotOwnerError(error.status, error.error));
    }
    return throwError(new AppError(error.status, error.statusText));
  }
}
