import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../project/project.actions';
import { Project, ProjectState, getNewProject } from '../../project';

@Component({
  selector: 'my-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  projectForm: FormGroup;
  project: Project = {};
  projectState$: Observable<ProjectState>;
  isProjectsLoaded = false;
  isEditMode = false;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private route: ActivatedRoute,
    private router: Router) {
    this.projectState$ = this.store.select(state => state.project);
  }
  areEqual(group: FormGroup) {
    const areEqual = group.get('password').value ===
      group.get('passwordConfirm').value;
    return areEqual;
  }

  ngOnInit() {
    this.route.params.takeUntil(this.destroyed$)
      .subscribe((params: Params) => {
        this.projectState$.takeUntil(this.destroyed$)
          .subscribe(projectState => {
            if (!projectState.isProjectsLoaded) {
              return;
            }

            this.project = projectState.projects.find(p => p._id === params['id']);

            if (!this.project) {
              this.project = getNewProject();
              this.isEditMode = true;
            } else {
              this.isEditMode = false;
            }

            this.projectForm = this.formBuilder.group({
              name: [this.project.name, Validators.required],
              idea: [this.project.idea, Validators.required],
              motivation: [this.project.motivation, Validators.required],
              description: [this.project.description, Validators.required],
            });
            this.isProjectsLoaded = true;
          });
      });
  }

  saveProject() {
    this.store.dispatch(this.projectActions.saveProject(
      Object.assign({}, this.project, this.projectForm.getRawValue()
      )));
    this.isEditMode = false;
  }

  editForm() {
    this.isEditMode = true;
  }

  submitForm(projectForm: FormGroup) {
    if (!projectForm.valid) {
      return;
    }
    this.saveProject();
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
