import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { catchError, flatMap, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AppError, BadIdError, BadInputError, NoMemberError, NotOwnerError, NoTweetError } from '../../shared/common';
import { ErrorTypes } from '../../shared/models/error-types';
import { Tweet, TweetStars } from '../../shared/models/tweet';

@Injectable()
export class TweetService {

  // behaviorSubject containing the new tweet.
  // tslint:disable-next-line: variable-name
  private _newTweet: BehaviorSubject<Tweet> = new BehaviorSubject<Tweet>(null);
  public readonly newTweet: Observable<Tweet> = this._newTweet.asObservable();

  public currentProfileId = '';

  constructor(private http: HttpClient) { }

  /**
   * Sends request for all tweets every ten seconds.
   * @returns Observable containing all tweets.
   */
  getAllTweets(): Observable<Tweet[]> {
    return timer(0, 10000)
      .pipe(
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/tweets`)
            .pipe(
              catchError(this.handleError)
            );
        }));
  }

  /**
   * Sends request for all specific member tweets every ten seconds.
   * @param memberId the id of desired user.
   * @returns Observable containing all member tweets.
   */
  getMemberTweets(memberId: string): Observable<Tweet[]> {
    return timer(0, 10000)
      .pipe(
        flatMap(() => {
          return this.http.get<Tweet[]>(`${environment.baseUrl}/members/${memberId}/tweets`)
            .pipe(
              catchError(this.handleError)
            );
        }));
  }

  /**
   * Sends request to the server for posting new tweet/reply.
   * @param tweetContent the tweet text.
   * @returns Observable containing new tweet.
   */
  postTweet(tweetContent: string): Observable<Tweet> {
    return this.http.post<Tweet>(`${environment.baseUrl}/tweets`, { text: tweetContent })
      .pipe(
        tap(newTweet => this._newTweet.next(newTweet)),
        catchError(this.handleError)
      );
  }

  /**
   * Sends request to the server for deleting a tweet.
   * @param tweetId the desired tweet id for delete.
   * @returns Observable containg the answer if tweet was deleted or not.
   */
  deleteTweet(tweetId: string) {
    return this.http.delete(`${environment.baseUrl}/tweets/${tweetId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Sends request to the server for star-toggle.
   * @param tweetId the desired tweet id for star-toggle.
   * @returns Observable containing updated stars count and starredByMe.
   */
  starTweet(tweetId: string): Observable<TweetStars> {
    return this.http.post<TweetStars>(`${environment.baseUrl}/tweets/${tweetId}/star-toggle`, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Helper function for error handling from http requests.
   * @param error HttpErrorResponse.
   * @returns specific app error.
   */
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
