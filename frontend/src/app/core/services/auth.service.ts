import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize, tap, timeout } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenUrl = '/api/token/';
  private refreshTokenUrl = '/api/token/refresh/';
  private logOutUrl = '/api/logout/';
  private TOKEN_KEY = 'access_token';

  private readonly _isLoggedIn = new BehaviorSubject<boolean>(!!this.getToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): String | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{access: string}>(
      `${this.tokenUrl}`, { username, password }
    ).pipe(
      tap(response => {
        console.log(response)
        localStorage.setItem(this.TOKEN_KEY, response.access);
        this._isLoggedIn.next(true);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        this._isLoggedIn.next(false);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    console.log('Logging out.')
    return this.http.post(`${this.logOutUrl}`, {})
      .pipe(
        tap(() => {
          console.log('Logout request succeeded.');
        }),
        catchError((error) => {
          console.error('Logout request failed:', error);
          throw error;
        }),
        finalize(() => {
          console.log('Finalizing log out request.');
          this._isLoggedIn.next(false);
          localStorage.removeItem(this.TOKEN_KEY);
          this.router.navigate(['/login']);
        })
      );
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post<{access: string}>(`${this.refreshTokenUrl}`, {})
      .pipe(
        tap((response) => {
          localStorage.setItem(this.TOKEN_KEY, response.access)
          console.log('Access token refreshed')
        }),
        catchError((error) => {
          console.error('Refresh error:', error);
          throw error;
        })
      );
  }

  register(form: FormGroup): Observable<any>{
    return this.http.post('/api/register/', form);
  }
}
