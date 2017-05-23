import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CurrentUserService } from './current-user.service';
// import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  private currentUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private currentUserService: CurrentUserService
    // private slimLoader: SlimLoadingBarService
  ) {}

  ngOnInit(): void {
    this.currentUserService.getUser().subscribe(
      (user: firebase.User) => {
        if (user) {
          this.currentUser = user;

          // this.sub = this.router.events.subscribe(event => {
          //     if (event instanceof NavigationStart) {
          //         this.slimLoader.start();
          //     } else if ( event instanceof NavigationEnd ||
          //                 event instanceof NavigationCancel ||
          //                 event instanceof NavigationError) {
          //         this.slimLoader.complete();
          //     }
          // }, (error: any) => {
          //     this.slimLoader.complete();
          // });

        } else {
          // console.log('You are not authenticated');
        }
      }
    )
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
