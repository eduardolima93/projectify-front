import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user/user.actions';
import { User } from '../../user/user.model';

@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  registerForm: FormGroup;
  isEditMode = false;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions) {
    this.registerForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      about: '',
      skills: '',
    }, { validator: this.areEqual });
  }

  areEqual(group: FormGroup) {
    const areEqual = group.get('password').value ===
      group.get('passwordConfirm').value;
    return areEqual;
  }

  ngOnInit() {
  }

  clearName() {
  }

  register(user: User) {
    this.store.dispatch(this.userActions.register(user));
  }

  submitForm(registerForm: FormGroup) {
    if (registerForm.get('password').value !== registerForm.get('passwordConfirm').value) {
      return;
    }

    this.register(registerForm.getRawValue());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
