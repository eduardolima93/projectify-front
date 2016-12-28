import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../project/project.actions';
import { UserActions, User } from '../../user';
import { Project } from '../../project/project.model';
import { projects } from './Projects';

@Component({
  selector: 'my-project-list',
  templateUrl: './projectList.component.html',
  styleUrls: ['./projectList.component.css']
})

export class ProjectListComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  // projects: Array<Project> = [];
  projects = [];
  projects$: Observable<Array<Project>>;
  user: User;
  latitude: number = null;
  longitude: number = null;
  zoom: number = 14;

  constructor(fb: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private userActions: UserActions,
  ) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.projects = projects;
    this.projects$ = this.store.select(state => state.project.projects);
    // this.projects$.takeUntil(this.destroyed$)
    //   .subscribe(projects => { this.projects = projects; });
    this.store.select(state => state.user.user)
      .takeUntil(this.destroyed$)
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  joinProject(projectId: number): void {
    this.store.dispatch(this.projectActions.joinProject(projectId));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  projectMouseOver(project) {
    project.iconUrl = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
  }

  projectMouseLeave(project) {
    project.iconUrl = '';
  }

  onMapChange() {
    console.log(this.zoom, this.latitude, this.longitude);
  }

  zoomChange(zoom) {
    this.zoom = zoom;
    this.onMapChange();
  }

  centerChange(position) {
    this.latitude = position.lat;
    this.longitude = position.lng;
    this.onMapChange();
  }

  markerClick(project) {
    this.projects.forEach(p => {
      p.isOpen = project === p;
      return p;
    });
  }
}
