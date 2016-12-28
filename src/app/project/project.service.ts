import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { API_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request-base';
import { Project } from './project.model';

@Injectable()
export class ProjectService extends RequestBase {
  constructor(public http: Http) {
    super(http);
  }

  getProjects(): Observable<string> {
    return this.http.get(`${API_BASE_URL}/project`, this.options)
      .map(res => res.json());
  }

  getProject(projectId): Observable<string> {
    return this.http.get(`${API_BASE_URL}/project/projectId`, this.options)
      .map(res => res.json());
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post(`${API_BASE_URL}/project`, { project }, this.options)
      .map(res => res.json());
  }

  joinProject(projectId: number): Observable<Project> {
    return this.http.post(`${API_BASE_URL}/project/joinProject`, { projectId }, this.options)
      .map(res => res.json());
  }
}
