import { Injectable } from '@angular/core';
import {
  CanActivate,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree, Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {isLoggedIn} from './auth.selectors';
import {tap} from 'rxjs/operators';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class AuthGuard implements CanActivate {
  
  constructor(private store: Store<AppState>,
              private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
            this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
