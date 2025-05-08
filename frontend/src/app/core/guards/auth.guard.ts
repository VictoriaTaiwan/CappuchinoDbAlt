import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isLoggedIn = localStorage.getItem('access_token');
    if (isLoggedIn!=null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
