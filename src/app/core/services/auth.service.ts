import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AppError, BadCredentialsError, BadPasswordError, EmailExistsError, UsernameExistsError } from '../../shared/common';
import { ErrorTypes } from '../../shared/models/error-types';
import { UserDetails, UserToken } from '../../shared/models/user';

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

  isAuthenticated(): boolean {
    return !!this.userToken;
  }

  getToken(): string {
    return this.userToken;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.userToken = token;
    this.setCurrentUser(token);
  }

  getLoggedUsername(): string {
    return this.currentLoggedUser.username;
  }

  getLoggedUserId(): string {
    return this.currentLoggedUser._id;
  }

  private decodeToken(token: string): UserToken {
    const helper = new JwtHelperService();
    const decodedToken: UserToken = helper.decodeToken(token);
    return decodedToken;
  }

  private setCurrentUser(token: string): void {
    const tokenDetails: UserToken = this.decodeToken(token);
    this.currentLoggedUser = {
      _id: tokenDetails._id,
      username: tokenDetails.username
    };
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userToken = '';
    this.currentLoggedUser = null;
  }

  login(userEmail: string, userPassword: string): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${environment.baseUrl}/auth/login`, { email: userEmail, password: userPassword })
      .pipe(
        catchError(this.handleError),
        // finalize(() => console.log('Sequence complete'))
      );
  }

  register(userEmail: string, userName: string, userPassword: string): Observable<UserDetails> {
    return this.http.post<UserDetails>(
      `${environment.baseUrl}/auth/register`,
      { email: userEmail, username: userName, password: userPassword })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      if (error.error === ErrorTypes.invalidCred) {
        return throwError(new BadCredentialsError(error.status, error.error));
      } else {
        return throwError(new BadPasswordError(error.status, error.error));
      }
    }
    if (error.status === 409) {
      if (error.error === ErrorTypes.emailExists) {
        return throwError(new EmailExistsError(error.status, error.error));
      } else {
        return throwError(new UsernameExistsError(error.status, error.error));
      }
    }
    return throwError(new AppError(error.status, error.statusText));
  }
}
