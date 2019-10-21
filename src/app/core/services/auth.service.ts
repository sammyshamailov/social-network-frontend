import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  AppError,
  BadCredentialsError,
  BadEmailError,
  BadIdError,
  BadPasswordError,
  EmailExistsError,
  NoMemberError,
  UsernameExistsError,
} from '../../shared/common';
import { ErrorTypes } from '../../shared/models/error-types';
import { User, UserDetails, UserToken } from '../../shared/models/user';

@Injectable()
export class AuthService {
  private userToken = '';
  private currentLoggedUser: UserToken;

  constructor(private http: HttpClient) {
    const token: string = localStorage.getItem('token');
    if (token) {
      this.userToken = token;
      this.setCurrentUser(token);
    }
  }

  /**
   * Returnes whether user is logged in.
   * @returns true if logged in.
   */
  isAuthenticated(): boolean {
    return !!this.userToken;
  }

  /**
   * Returnes token.
   * @returns User token.
   */
  getToken(): string {
    return this.userToken;
  }

  /**
   * Sets token to local storage and
   * and calles function for setting logged in user details.
   * @param token The user token.
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.userToken = token;
    this.setCurrentUser(token);
  }

  /**
   * Gets username of logged in user.
   * @returns username.
   */
  getLoggedUsername(): string {
    return this.currentLoggedUser.username;
  }

  /**
   * Gets user id of logged in user.
   * @returns user id.
   */
  getLoggedUserId(): string {
    return this.currentLoggedUser._id;
  }

  /**
   * Helper function for decoding the token.
   * @param token User token.
   * @returns decrypted user token payload.
   */
  private decodeToken(token: string): UserToken {
    const helper = new JwtHelperService();
    const decodedToken: UserToken = helper.decodeToken(token);
    return decodedToken;
  }

  /**
   * Sets current user details from token inside service.
   * @param token The user token of logged in user.
   */
  private setCurrentUser(token: string): void {
    const tokenDetails: UserToken = this.decodeToken(token);
    this.currentLoggedUser = {
      _id: tokenDetails._id,
      username: tokenDetails.username
    };
  }

  /**
   * Logouts the user by removing the token
   * from localStorage.
   */
  logout(): void {
    localStorage.removeItem('token');
    this.userToken = '';
    this.currentLoggedUser = null;
  }

  /**
   * Sends login credentials to server.
   * @param userEmail user email.
   * @param userPassword user password.
   * @returns Observable containing user details and token.
   */
  login(userEmail: string, userPassword: string): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${environment.baseUrl}/auth/login`, { email: userEmail, password: userPassword })
      .pipe(
        catchError(this.handleError),
      );
  }

  /**
   * Sends register request to server with needed data.
   * @param userFile avatar file content.
   * @param userFileName avatar file name.
   * @param userEmail user email.
   * @param userName username.
   * @param userPassword user password.
   * @returns Observable containing user details and token.
   */
  register(userFile, userFileName: string, userEmail: string, userName: string, userPassword: string): Observable<UserDetails> {
    return this.http.post<UserDetails>(
      `${environment.baseUrl}/auth/register`,
      { file: { content: userFile, name: userFileName }, email: userEmail, username: userName, password: userPassword })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Sends request for user details.
   * Required for profile info.
   * @param userId desired user id of user.
   * @returns user details.
   */
  getMember(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/members/${userId}`)
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
    if (error.status === 400) {
      if (error.error === ErrorTypes.invalidCred) {
        return throwError(new BadCredentialsError(error.status, error.error));
      } else if (error.error === ErrorTypes.badPasswordFormat) {
        return throwError(new BadPasswordError(error.status, error.error));
      } else if (error.error === ErrorTypes.badEmailFormat) {
        return throwError(new BadEmailError(error.status, error.error));
      } else {
        return throwError(new BadIdError(error.status, error.error));
      }
    }
    if (error.status === 409) {
      if (error.error === ErrorTypes.emailExists) {
        return throwError(new EmailExistsError(error.status, error.error));
      } else {
        return throwError(new UsernameExistsError(error.status, error.error));
      }
    }
    if (error.status === 404) {
      return throwError(new NoMemberError(error.status, error.error));
    }
    return throwError(new AppError(error.status, error.statusText));
  }
}
