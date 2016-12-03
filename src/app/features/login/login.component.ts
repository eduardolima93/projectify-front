import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user/user.actions';
import { User } from '../../user/user.model';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  loginForm: FormGroup;
  isEditMode = false;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  clearName() {
  }

  login(user) {
    this.store.dispatch(this.userActions.login(user));
  }

  submitForm(userForm: FormGroup) {
    this.login(userForm.getRawValue());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
