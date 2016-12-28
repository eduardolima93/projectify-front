import { NgZone, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from 'angular2-google-maps/core';

declare var google: any;

import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { ProjectActions, Project, ProjectState, getNewProject } from '../../project';
import { UserState, User } from '../../user';
import { validateEmail } from '../../services/validators';

@Component({
  selector: 'my-edit-project',
  templateUrl: './editProject.component.html',
  styleUrls: ['./editProject.component.css']
})

export class EditProjectComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  projectForm: FormGroup;
  project: Project;
  projectState$: Observable<ProjectState>;
  isProjectLoaded = false;
  triedToSubmit = false;
  defaultLatitude: number;
  defaultLongitude: number;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private projectActions: ProjectActions,
    private route: ActivatedRoute,
    private router: Router,
    private _loader: MapsAPILoader,
    private ngZone: NgZone) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.defaultLatitude = position.coords.latitude;
      this.defaultLongitude = position.coords.longitude;
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.autocomplete();
    }, 0);
    let project = getNewProject();
    this.projectForm = this.formBuilder.group({
      name: [project.name,
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      objective: [project.objective,
      [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      description: [project.description,
      [Validators.required, Validators.minLength(5), Validators.maxLength(800)]],
      activity: [project.activity,
      [Validators.maxLength(300)]],
      needing: [project.needing,
      [Validators.maxLength(300)]],
      contactEmail: [project.contactEmail,
      [Validators.required, Validators.maxLength(25), validateEmail]],
      contactNumber1: [project.contactNumber1, [Validators.maxLength(15)]],
      contactNumber2: [project.contactNumber2, [Validators.maxLength(15)]],
      website: [project.website, [Validators.maxLength(25)]],
      facebookPage: [project.facebookPage, [Validators.maxLength(25)]],
    });
    this.project = Object.assign({}, project);
  }

  autocomplete() {
    let searchInput = document.getElementById('googlePlacesAutocomplete')
      .getElementsByTagName('input')[0];
    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(searchInput, {
        types: ['address']
      });
      searchInput.placeholder = '';
      searchInput.id = 'googlePlacesAutocompleteInput';
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.ngZone.run(() => {
          let place = autocomplete.getPlace();
          this.project.address = {
            formattedAddress: place.formatted_address,
            placeId: place.place_id,
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          }
        });
      });
    });
  }

  submitForm(projectForm: FormGroup) {
    this.triedToSubmit = true;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  textareaKeyDown(event) {
    event.target.style.height = 'auto';

    let correction = event.target.offsetHeight - event.target.clientHeight;
    event.target.style.height = ((event.target.scrollHeight - correction)) + 'px';
  }
}
