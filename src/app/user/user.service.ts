import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';
import { User } from './index';

@Injectable()
export class UserService extends RequestBase {

  constructor(public http: Http) {
    super(http);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get(`${API_BASE_URL}/auth/currentUser`, this.options)
      .map(res => res.json());
  }

  login(user: User): Observable<User> {
    return this.http.post(`${API_BASE_URL}/auth/login`, user, this.options)
      .map(res => res.json());
  }

  register(user: User): Observable<User> {
    return this.http.post(`${API_BASE_URL}/auth/register`, user, this.options)
      .map(res => res.json());
  }

  updateUser(user: User): Observable<User> {
    return this.http.post(`${API_BASE_URL}/user`, { user }, this.options)
      .map(res => res.json());
  }

  getUsers(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/user`, this.options)
      .map(res => res.json());
  }
}
