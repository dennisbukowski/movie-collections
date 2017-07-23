import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  authenticated$: Observable<boolean>;
  uid$: Observable<string>;

  constructor(public afAuth: AngularFireAuth) {
    this.authenticated$ = this.getUser().map(user => !!user); // double exclamation ensures boolean type
    this.uid$ = this.getUser().map(user => user.uid);
  }
  getUser() {
    // return the observable. DO NOT subscribe here.
    return this.afAuth.authState;
    // hint: you could also transform the value before returning it:
    // return this.af.auth.map(authData => new User({name: authData.name}));
  }
  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
