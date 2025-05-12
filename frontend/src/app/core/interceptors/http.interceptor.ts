import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, finalize, map, mergeMap, Observable, retry, retryWhen, switchMap, take, tap, throwError, timer } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.cloneRequest(request);

    return next.handle(request).pipe(
      tap(response=>{
        console.log(response);
      }),
      catchError(err => {
        console.log(err);
        if (err.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          console.warn('Access denied. Attempting token refresh...');

          return this.auth.refreshAccessToken().pipe(
            switchMap(() => {
              const retryReq = this.cloneRequest(request);
              return next.handle(retryReq);
            }),
            catchError(refreshErr => {
              console.error('Token refresh failed:', refreshErr);
              return this.auth.logout().pipe(
                switchMap(() => throwError(() => new Error('Token refresh and logout executed.')))
              );
            }),
            finalize(() => {
              this.isRefreshing = false;
            })
          );
        }

        return throwError(() => err);
      })
    );
  }

  private cloneRequest(request:HttpRequest<any>): HttpRequest<any>{
    const token = this.auth.getToken();
    return request = request.clone({ 
      headers: request.headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true 
    });
  }
}
