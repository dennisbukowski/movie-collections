import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private currentUser: any;
  private currentId: any;
  private isClicked: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.isClicked = false;
    this.authenticationService.getUser().subscribe(
      (user: firebase.User) => {
        if (user) {
          this.currentUser = user;
          this.currentId = this.currentUser.uid;
        } else {
          // console.log('You are not authenticated');
        }
      }
    )
    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            // start event
        } else if ( event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError) {
            // complete event
        }
    }, (error: any) => {
        // complete event
    });
  }

  toggleSideNav(): void {
    (this.isClicked) ? this.isClicked = false : this.isClicked = true;
  }
  signOutMain(): void {    
    this.authenticationService.signOut();
  }
  signOut(): void {
    (this.isClicked) ? this.isClicked = false : this.isClicked = true;
    this.authenticationService.signOut();
  }
}
