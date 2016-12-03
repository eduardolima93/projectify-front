/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { User } from './user.model';

@Injectable()

export class UserActions {

  static EDIT_USER = '[User] Edit User';
  editUser(): Action {
    return {
      type: UserActions.EDIT_USER,
    };
  }

  static GET_USERS = '[User] Get Users';
  getUsers(): Action {
    return {
      type: UserActions.GET_USERS
    };
  }
  static GET_USERS_FAIL = '[User] Get Users Fail';
  getUsersFail(err: Error): Action {
    return {
      type: UserActions.GET_USERS_FAIL,
      payload: err
    };
  }
  static GET_USERS_SUCCESS = '[User] Get Users Success';
  getUsersSuccess(res: Response): Action {
    return {
      type: UserActions.GET_USERS_SUCCESS,
      payload: res
    };
  }


  static CANCEL_EDIT_USER = '[User] Cancel Edit User';
  cancelEditUser(): Action {
    return {
      type: UserActions.CANCEL_EDIT_USER,
    };
  }

  static GET_CURRENT_USER = '[User] Get Current User';
  getCurrentUser(): Action {
    return {
      type: UserActions.GET_CURRENT_USER,
    };
  }

  static GET_CURRENT_USER_SUCCESS = '[User] Get Current User Success';
  getCurrentUserSuccess(res: Response): Action {
    return {
      type: UserActions.GET_CURRENT_USER_SUCCESS,
      payload: res,
    };
  }

  static GET_CURRENT_USER_FAIL = '[User] Get Current User Fail';
  getCurrentUserFail(err: Error): Action {
    return {
      type: UserActions.GET_CURRENT_USER_FAIL,
      payload: err,
    };
  }

  static REGISTER = '[User] Register';
  register(user: User): Action {
    return {
      type: UserActions.REGISTER,
      payload: { user }
    };
  }

  static REGISTER_SUCCESS = '[User] Register Success';
  registerSuccess(res: Response): Action {
    return {
      type: UserActions.REGISTER_SUCCESS,
      payload: res,
    };
  }

  static REGISTER_FAIL = '[User] Register Fail';
  registerFail(err: Error): Action {
    return {
      type: UserActions.REGISTER_FAIL,
      payload: err,
    };
  }


  static UPDATE_USER = '[User] Update User';
  updateUser(user: User): Action {
    return {
      type: UserActions.UPDATE_USER,
      payload: { user }
    };
  }

  static UPDATE_USER_SUCCESS = '[User] Update User Success';
  updateUserSuccess(res: Response): Action {
    return {
      type: UserActions.UPDATE_USER_SUCCESS,
      payload: res,
    };
  }

  static UPDATE_USER_FAIL = '[User] Update User Fail';
  updateUserFail(err: Error): Action {
    return {
      type: UserActions.UPDATE_USER_FAIL,
      payload: err,
    };
  }

  static LOGIN = '[User] Login';
  login(user: User): Action {
    return {
      type: UserActions.LOGIN,
      payload: { user }
    };
  }

  static LOGIN_SUCCESS = '[User] Login Success';
  loginSuccess(res: Response): Action {
    return {
      type: UserActions.LOGIN_SUCCESS,
      payload: res,
    };
  }

  static LOGIN_FAIL = '[User] Login Fail';
  loginFail(err: Error): Action {
    return {
      type: UserActions.LOGIN_FAIL,
      payload: err,
    };
  }

  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }
}
