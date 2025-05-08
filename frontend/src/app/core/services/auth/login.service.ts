import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenUrl = '/api/token/';
  private refreshTokenUrl = '/api/token/refresh/';
  private TOKEN_KEY = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{access: string}>(
      `${this.tokenUrl}`, { username, password }, { withCredentials: true }
    ).pipe(
      tap(response => {
        console.log(response)
        localStorage.setItem(this.TOKEN_KEY, response.access);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  logout(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    this.http.post('/api/logout/', {}, {       
      headers: {
      Authorization: `Bearer ${token}`
    }, 
    withCredentials: true 
  }).subscribe(() => {
      localStorage.removeItem(this.TOKEN_KEY);
      this.router.navigate(['/login']);
    });
  }

  refreshAccessToken(): Observable<any> {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return this.http.post<{access: string}>(
      this.refreshTokenUrl, {}, { 
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