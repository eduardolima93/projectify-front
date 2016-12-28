import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { GOOGLE_MAPS_API_KEY } from '../../services/constants';
import { routes } from './projectList.routing';
import { ProjectListComponent } from './projectList.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_MAPS_API_KEY
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProjectListComponent
  ]
})

export class LazyModule { }

