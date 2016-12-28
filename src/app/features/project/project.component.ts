import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions, Project, ProjectState, getNewProject } from '../../project';
import { UserState, User } from '../../user';

@Component({
  selector: 'my-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  projectForm: FormGroup;
  project: Project;
  projectState$: Observable<ProjectState>;
  users: User[] = [];
  participants: User[] = [];
  isProjectLoaded = false;
  isEditMode = false;
  bannedWords = ['drogas', 'armas', 'tráfico', 'briga'];

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private route: ActivatedRoute,
    private router: Router) {
    this.projectState$ = this.store.select(state => state.project);
    this.store.select(state => state.user.users)
      .takeUntil(this.destroyed$)
      .subscribe(users => {
        this.users = users;
        this.setParticipants();
      });
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
            if (!projectState.isProjectsLoaded || this.isProjectLoaded) {
              return;
            }

            let project = projectState.projects.find(p => p._id === params['id']);

            if (!project) {
              project = getNewProject();
              this.isEditMode = true;
            } else {
              this.isEditMode = false;
            }

            this.projectForm = this.formBuilder.group({
              name: [project.name, Validators.required],
              idea: ['', Validators.required],
              motivation: ['', Validators.required],
              description: [project.description, Validators.required],
            });
            this.isProjectLoaded = true;


            this.project = Object.assign({}, project);
            this.setParticipants();
          });
      });
  }

  setParticipants() {
    if (!this.project) {
      return;
    }
    this.participants = this.users
      .filter(u => this.project.participantIds.indexOf(u._id) !== -1);
  }

  saveProject() {
    let projectToSave = Object.assign({}, this.project, this.projectForm.getRawValue());
    if (this.hasBannedWords(projectToSave)) {
      alert('Conteúdo suspeito.');
      return;
    }


    this.store.dispatch(this.projectActions.saveProject(projectToSave));
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

  private hasBannedWords(project: Project): boolean {
    if ((new RegExp('\\b' + this.bannedWords.join('\\b|\\b') + '\\b'))
      .test(project.description.toLowerCase())) {
      return true;
    }
    return false;
  }
}
