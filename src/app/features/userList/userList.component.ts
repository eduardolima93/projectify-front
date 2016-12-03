import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../project/project.actions';
import { UserActions } from '../../user/user.actions';
import { User } from '../../user/user.model';

@Component({
  selector: 'my-user-list',
  templateUrl: './userList.component.html',
  styleUrls: ['./userList.component.css']
})

export class UserListComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  userForm: FormGroup;
  users: User[] = [];
  users$: Observable<User[]>;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private userActions: UserActions) {
    this.users$ = this.store.select(state => state.user.users);
    this.users$.takeUntil(this.destroyed$)
      .subscribe(users => { this.users = users; });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
