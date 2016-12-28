/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'login', loadChildren: './features/login/index#LazyModule' },
  { path: 'register', loadChildren: './features/register/index#LazyModule' },
  { path: 'user/:id', loadChildren: './features/user/index#LazyModule', canActivate: [AuthService] },
  { path: 'projects', loadChildren: './features/projectList/index#LazyModule', canActivate: [AuthService] },
  { path: 'users', loadChildren: './features/userList/index#LazyModule', canActivate: [AuthService] },
  { path: 'project/:id', loadChildren: './features/project/index#LazyModule', canActivate: [AuthService] },
  { path: 'editProject/:id', loadChildren: './features/editProject/index#LazyModule', canActivate: [AuthService] },
  { path: '**', component: NotFound404Component }
];
