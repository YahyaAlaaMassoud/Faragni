import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('jwt')) {
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}

@Injectable()
export class HomePageGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('jwt')) {
          // logged in so return true
          this.router.navigate(['/movies', 1]);
          return false;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/home']);
      return true;
  }
}