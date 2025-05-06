import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/token/'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password }).pipe(
      map((response) => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/dashboard']);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']); // Redirect to login page
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}