import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../../user/user.actions';
import { User, UserState } from '../../user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'my-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  userForm: FormGroup;
  user: User = {};
  userState$: Observable<UserState>;
  isEditMode = false;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
    private authService: AuthService,
  ) {
    this.userForm = fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.name, Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      about: this.user.about,
      skills: this.user.skills,
    });
    this.userState$ = this.store.select(state => state.user);
    this.userState$.takeUntil(this.destroyed$)
      .subscribe(userState => {
        this.isEditMode = userState.isEditingUser;
        this.user = userState.user;
        this.userForm.patchValue(this.user);
      });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  editForm() {
    this.store.dispatch(this.userActions.editUser());
  }

  cancelEditForm() {
    this.store.dispatch(this.userActions.cancelEditUser());
  }

  updateUser(user: User) {
    this.store.dispatch(this.userActions.updateUser(user));
  }

  submitForm(userForm: FormGroup) {
    this.updateUser(Object.assign({}, this.user, userForm.getRawValue()));
  }

  ngOnDestroy() {
    this.cancelEditForm();
    this.destroyed$.next();
  }
}
