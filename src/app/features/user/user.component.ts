import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  canEdit = false;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.userForm = fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      about: this.user.about,
      skills: this.user.skills,
    });
    this.userState$ = this.store.select(state => state.user);
    this.userState$.takeUntil(this.destroyed$)
      .subscribe(userState => {
        this.route.params.select(params => params['id'])
          .takeUntil(this.destroyed$)
          .subscribe(paramsUserId => {
            if (paramsUserId && paramsUserId !== userState.user._id) {
              this.user = userState.users.find(u => u._id === paramsUserId);
            } else {
              this.canEdit = true;
              this.isEditMode = userState.isEditingUser;
              this.user = userState.user;
            }
            if (this.user) {
              this.userForm.patchValue(this.user);
            }
          });
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
