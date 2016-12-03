import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { JWT_KEY } from './constants';

@Injectable()
export class RequestBase {
  headers = new Headers();
  noPreFlightHeaders = new Headers();
  options = new RequestOptions({
    headers: this.headers,
    withCredentials: true
  });
  optionsNoPre = new RequestOptions({
    headers: this.noPreFlightHeaders,
    withCredentials: true
  });
  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }
  constructor(public http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.noPreFlightHeaders.append('Content-Type', 'text/plain');

    const token = window.localStorage.getItem(JWT_KEY);
    if (token) {
      this.setHeaders({ Authorization: token });
    }
  }
}
