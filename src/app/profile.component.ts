import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthenticationService } from './authentication.service';
import { fadeInAnimation } from './animations/index';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnInit {
  private collections: FirebaseListObservable<any>;
  private currentUser: string;
  private userParamId: string;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe(
      auth => {
        if (auth) {
          this.currentUser = auth.uid;
          this.userParamId = this._route.snapshot.params['uid'];
          this.collections = this.db.list('/users/' + this.userParamId + '/collections' );
        }
      });
  }

  createCollection(uid: string) {
    // post entry
    let postData = {
      uid: uid,
      collectionTitle: 'Untitled Collection'
    };

    // get a key for a new post
    let newPostKey = firebase.database().ref().push().key;

    // write the new post's data simultaneously in the posts list and the user's post list
    let updates = {};
    updates['/collections/' + newPostKey] = postData;
    updates['/users/' + uid + '/collections/' + newPostKey] = postData;

    this.db.object('/').update(updates);
    this.router.navigate(['/profile/' + this.currentUser + '/' + newPostKey]);
  }

  deleteCollection(collection: any){
    let deletions = {};
    deletions['/collections/' + collection.$key] = null;
    deletions['/users/' + this.currentUser + '/collections/' + collection.$key] = null;
    this.db.object('/').update(deletions);
  }

}
