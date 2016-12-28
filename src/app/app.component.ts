import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';
import { ProjectActions } from './project';
import { UserActions } from './user';
import { AppState } from './reducers';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  isLoggedIn = false;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;
  userFirstName: string = '';
  userId: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private projectActions: ProjectActions,
    private userActions: UserActions,
    private store: Store<AppState>,
    private authService: AuthService) {
    this.store.select(state => state.user)
      .filter(userState => userState.isLoggedIn)
      .subscribe(userState => {
        this.isLoggedIn = userState.isLoggedIn;
        this.store.dispatch(this.projectActions.getProjects());
        if (!userState.isUsersLoaded) {
          this.store.dispatch(this.userActions.getUsers());
        }
        if (!userState.isLoaded) {
          this.store.dispatch(this.userActions.getCurrentUser());
        } else {
          this.userFirstName = userState.user.name.split(' ')[0];
          this.userId = userState.user._id;
        }
      });
  }

  logout() {
    this.authService.logout();
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
