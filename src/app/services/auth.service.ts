import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import { AppState } from '../reducers';
import { CanActivate, Router } from '@angular/router';
import { JWT_KEY } from './constants';
import { UserActions } from '../user';

@Injectable()
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userActions: UserActions,
  ) {
  }


  canActivate(): boolean {
    let state: AppState;
    this.store.take(1).subscribe(s => state = s);
    let isAuthorized = state.user.isLoggedIn;
    if (!isAuthorized) {
      this.navigateToLogin();
    }
    return isAuthorized;
  }

  logout() {
    window.localStorage.removeItem(JWT_KEY);
    this.store.dispatch(this.userActions.logout());
    this.navigateToLogin();
  }

  navigateToLogin() {
    this.store.dispatch(go(['', 'login']));
  }
}
