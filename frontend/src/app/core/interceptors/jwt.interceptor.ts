import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { LoginService } from "../services/auth/login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ withCredentials: true });

    return next.handle(request).pipe(
      tap(()=>console.log('Interceptor working')),
      catchError(err => {
        if (err.status === 401) {
          console.log('Refreshing access token');
          return this.auth.refreshAccessToken().pipe(
            switchMap(() => {
              const retryReq = request.clone({ withCredentials: true });
              return next.handle(retryReq);
            }),
            catchError(refreshErr => {
              this.auth.logout();
              return throwError(() => refreshErr);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
