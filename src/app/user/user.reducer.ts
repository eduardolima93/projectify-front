/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { User } from './user.model';
import { JWT_KEY } from '../services/constants';

export interface UserState {
  user: User;
  users: User[];
  isUsersLoaded: boolean;
  isLoggedIn: boolean;
  isLoaded: boolean;
  isEditingUser: boolean;
};

const initialState: UserState = {
  user: {},
  users: [],
  isUsersLoaded: false,
  isLoggedIn: Boolean(window.localStorage.getItem(JWT_KEY)),
  isLoaded: false,
  isEditingUser: false,
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.EDIT_USER: {
      return Object.assign({}, state, { isEditingUser: true });
    }
    case UserActions.CANCEL_EDIT_USER: {
      return Object.assign({}, state, { isEditingUser: false });
    }
    case UserActions.UPDATE_USER_SUCCESS: {
      const user = action.payload.user;
      return Object.assign({}, state, {
        user,
        isLoggedIn: true,
        isLoaded: true,
        isEditingUser: false
      });
    }
    case UserActions.LOGIN_SUCCESS:
    case UserActions.REGISTER_SUCCESS: {
      console.log(action.payload.user);
      const user = action.payload.user;
      return Object.assign({}, state, { user, isLoggedIn: true, isLoaded: true });
    }

    case UserActions.GET_CURRENT_USER_SUCCESS: {
      const user = action.payload.user;
      return Object.assign({}, state, { user, isLoggedIn: true, isLoaded: true });
    }

    case UserActions.LOGOUT: {
      return Object.assign({}, state, { user: {}, isLoggedIn: false, isLoaded: false });
    }

    case UserActions.GET_USERS_SUCCESS: {
      const users = action.payload.users;
      return Object.assign({}, state, {
        users,
        isUsersLoaded: true
      });
    }


    default: {
      return state;
    }
  }
}
