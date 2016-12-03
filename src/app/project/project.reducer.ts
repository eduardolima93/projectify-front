/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { ProjectActions } from './project.actions';
import { Project, ProjectStatusType } from './project.model';

export interface ProjectState {
  projects: Array<Project>;
  isLoadingProjects: boolean;
  isProjectsLoaded: boolean;
};

const initialState: ProjectState = {
  projects: [],
  isLoadingProjects: false,
  isProjectsLoaded: false,
};

export function projectReducer(state = initialState, action: Action): ProjectState {
  switch (action.type) {

    case ProjectActions.SAVE_PROJECT_SUCCESS: {
      const project = action.payload.project;
      const indexOfProjectInProject = state.projects
        .findIndex(p => p._id === project._id);
      if (indexOfProjectInProject !== -1) {
        const nextProjects = [...state.projects];
        nextProjects[indexOfProjectInProject] = project;
        return Object.assign({}, state,
          { projects: nextProjects });
      }
      return Object.assign({}, state,
        { projects: [project, ...state.projects] });
    }

    case ProjectActions.GET_PROJECTS_SUCCESS: {
      const projects = action.payload.projects;
      return Object.assign({}, state, {
        projects,
        isProjectsLoaded: true
      });
    }

    default: {
      return state;
    }
  }
}
