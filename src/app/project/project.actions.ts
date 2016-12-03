/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Project } from './project.model';

@Injectable()

export class ProjectActions {

  static SAVE_PROJECT = '[Project] Save Project';
  saveProject(project: Project): Action {
    return {
      type: ProjectActions.SAVE_PROJECT,
      payload: { project }
    };
  }
  static SAVE_PROJECT_FAIL = '[Project] Save Project Fail';
  saveProjectFail(err: Error): Action {
    return {
      type: ProjectActions.SAVE_PROJECT_FAIL,
      payload: err
    };
  }
  static SAVE_PROJECT_SUCCESS = '[Project] Save Project Success';
  saveProjectSuccess(res: Response): Action {
    return {
      type: ProjectActions.SAVE_PROJECT_SUCCESS,
      payload: res
    };
  }

  static GET_PROJECTS = '[Project] Get Projects';
  getProjects(): Action {
    return {
      type: ProjectActions.GET_PROJECTS
    };
  }
  static GET_PROJECTS_FAIL = '[Project] Get Projects Fail';
  getProjectsFail(err: Error): Action {
    return {
      type: ProjectActions.GET_PROJECTS_FAIL,
      payload: err
    };
  }
  static GET_PROJECTS_SUCCESS = '[Project] Get Projects Success';
  getProjectsSuccess(res: Response): Action {
    return {
      type: ProjectActions.GET_PROJECTS_SUCCESS,
      payload: res
    };
  }

  static GET_PROJECT = '[Project] Get Project';
  getProject(projectId): Action {
    return {
      type: ProjectActions.GET_PROJECT,
      payload: projectId
    };
  }
  static GET_PROJECT_FAIL = '[Project] Get Project Fail';
  getProjectFail(err: Error): Action {
    return {
      type: ProjectActions.GET_PROJECT_FAIL,
      payload: err
    };
  }
  static GET_PROJECT_SUCCESS = '[Project] Get Project Success';
  getProjectSuccess(res: Response): Action {
    return {
      type: ProjectActions.GET_PROJECT_SUCCESS,
      payload: res
    };
  }
}
