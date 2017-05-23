import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { CollectionsComponent } from './collections.component';
import { ProfileComponent } from './profile.component';
import { UserCollectionComponent } from './user-collection.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { AuthGuard } from './auth-guard.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'profile/:uid',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:uid/:collectionId',
    component: UserCollectionComponent
  }
  // wildcard not found 404 (Needs to be last!)
  // {
  //   path: '**'
  // }
];

export const routing = RouterModule.forRoot(routes);
