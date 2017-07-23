import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { CollectionsComponent } from './collections.component';
import { CollectionComponent } from './collection.component';
import { ProfileComponent } from './profile.component';
import { UserCollectionComponent } from './user-collection.component';
import { AuthenticationComponent } from './authentication.component';

import { AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'portal',
    component: AuthenticationComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'collections/:collectionUid',
    component: CollectionComponent
  },
  {
    path: 'profile/:uid',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:uid/:collectionId',
    component: UserCollectionComponent,
    canActivate: [AuthGuard]
  },
  // wildcard not found 404 (Needs to be last!)
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
