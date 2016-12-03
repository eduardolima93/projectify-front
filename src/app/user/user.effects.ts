/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';

import { UserActions } from './user.actions';
import { AppState } from '../reducers';
import { UserService } from './index';
import { ProjectService } from '../project';
import { JWT_KEY } from '../services/constants';

@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectService: ProjectService,
    private userService: UserService,
    private userActions: UserActions
  ) { }

  @Effect() login$ = this.actions$
    .ofType(UserActions.LOGIN)
    .switchMap(({ payload }) => {
      return this.userService.login(payload.user)
        .mergeMap((res: any) => {
          this.onAuthenticateSuccess(res.token);
          this.store.dispatch(go([`/projects`]));
          return Observable.of(
            this.userActions.loginSuccess(res));
        })
        .catch((err) => Observable.of(
          this.userActions.loginFail(err)));
    });

  @Effect() register$ = this.actions$
    .ofType(UserActions.REGISTER)
    .switchMap(({ payload }) => {
      return this.userService.register(payload.user)
        .mergeMap((res: any) => {
          this.onAuthenticateSuccess(res.token);
          this.store.dispatch(go([`/projects`]));
          return Observable.of(
            this.userActions.registerSuccess(res));
        })
        .catch((err) => Observable.of(
          this.userActions.registerFail(err)));
    });

  @Effect() updateUser$ = this.actions$
    .ofType(UserActions.UPDATE_USER)
    .switchMap(({ payload }) => {
      return this.userService.updateUser(payload.user)
        .mergeMap((res: any) => {
          return Observable.of(
            this.userActions.updateUserSuccess(res));
        })
        .catch((err) => Observable.of(
          this.userActions.updateUserFail(err)));
    });

  @Effect() getUsers$ = this.actions$
    .ofType(UserActions.GET_USERS)
    .switchMap(() => {
      return this.userService.getUsers()
        .mergeMap((res: any) => Observable.of(
          this.userActions.getUsersSuccess(res)))
        .catch((err) => Observable.of(
          this.userActions.getUsersFail(err)));
    });

  @Effect() getCurrentUser$ = this.actions$
    .ofType(UserActions.GET_CURRENT_USER)
    .switchMap(() => {
      return this.userService.getCurrentUser()
        .mergeMap((res: any) => Observable.of(
          this.userActions.getCurrentUserSuccess(res)))
        .catch((err) => Observable.of(
          this.userActions.getCurrentUserFail(err)));
    });

  private onAuthenticateSuccess(token) {
    localStorage.setItem(JWT_KEY, token);
    this.userService.setHeaders({ Authorization: token });
    this.projectService.setHeaders({ Authorization: token });
  }
}
