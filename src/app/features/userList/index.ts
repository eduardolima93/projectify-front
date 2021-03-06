import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { routes } from './userList.routing';
import { UserListComponent } from './userList.component';
import { UserFilterPipe } from './userFilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserListComponent,
    UserFilterPipe,
  ]
})

export class LazyModule { }

