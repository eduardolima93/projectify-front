/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';

import { ProjectActions } from './project.actions';
import { AppState } from '../reducers';
import { ProjectService } from './project.service';

@Injectable()

export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private projectService: ProjectService,
    private projectActions: ProjectActions
  ) { }

  @Effect() getProjects$ = this.actions$
    .ofType(ProjectActions.GET_PROJECTS)
    .switchMap(() => {
      return this.projectService.getProjects()
        .mergeMap((res: any) => Observable.of(
          this.projectActions.getProjectsSuccess(res)))
        .catch((err) => Observable.of(
          this.projectActions.getProjectsFail(err)));
    });

  @Effect() saveProject$ = this.actions$
    .ofType(ProjectActions.SAVE_PROJECT)
    .switchMap(({ payload }) => {
      return this.projectService.saveProject(payload.project)
        .mergeMap((res: any) => {
          if (!payload.project._id) {
            this.store.dispatch(go([`/project/${res.project._id}`]));
          }
          return Observable.of(
            this.projectActions.saveProjectSuccess(res));
        })
        .catch((err) => Observable.of(
          this.projectActions.saveProjectFail(err)));
    });

  @Effect() getProject$ = this.actions$
    .ofType(ProjectActions.GET_PROJECT)
    .switchMap(({payload}) => {
      return this.projectService.getProject(payload)
        .mergeMap((res: any) => Observable.of(
          this.projectActions.getProjectSuccess(res)))
        .catch((err) => Observable.of(
          this.projectActions.getProjectFail(err)));
    });
}
