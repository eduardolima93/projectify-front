import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../project/project.actions';
import { UserActions } from '../../user/user.actions';
import { Project } from '../../project/project.model';

@Component({
  selector: 'my-project-list',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.css']
})

export class ProjectListComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  userForm: FormGroup;
  projects: Array<Project> = [];
  projects$: Observable<Array<Project>>;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private userActions: UserActions) {
    this.projects$ = this.store.select(state => state.project.projects);
    this.projects$.takeUntil(this.destroyed$)
      .subscribe(projects => { this.projects = projects; });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
