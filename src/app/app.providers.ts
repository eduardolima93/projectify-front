import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';
import { ProjectActions, ProjectService } from './project';
import { AuthService } from './services/auth.service';

export const APP_PROVIDERS = [
  UserActions,
  UserService,
  ProjectActions,
  ProjectService,
  AuthService,
];
