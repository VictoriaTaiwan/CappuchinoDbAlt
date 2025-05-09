import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenUrl = '/api/token/';
  private refreshTokenUrl = '/api/token/refresh/';
  private logOutUrl = '/api/logout/';
  private TOKEN_KEY = 'access_token';

  private readonly _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{access: string}>(
      `${this.tokenUrl}`, { username, password }, { withCredentials: true }
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

  logout(): void {
    this.http.post(`${this.logOutUrl}`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          console.log('Logout request succeeded.');
        }),
        catchError((error) => {
          console.error('Logout request failed:', error);
          return EMPTY;
        }),
        finalize(() => {
          this._isLoggedIn.next(false);
          localStorage.removeItem(this.TOKEN_KEY);
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  refreshAccessToken(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return this.http.post<{access: string}>(
      `${this.refreshTokenUrl}`, {}, { 
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true 
      }
    ).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.access)
        console.log('Access token refreshed')
      }),
      catchError((error) => {
        console.error('Token refresh failed', error);
        this.logout();
        throw error;
      })
    );
  }
}
