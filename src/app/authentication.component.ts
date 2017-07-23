import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'authentication-component',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  private showAuth: boolean;
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.showAuth = true;
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onLogin(formData: FormGroup) {
    if (formData.valid) {
      let creds: any = {email: formData.value.email, password: formData.value.password};
      this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
        .then(
          (success) => {
            console.log(success);
            this.router.navigate(['/']);
        })
        .catch(function(error) { console.log(error); });
    }
  }

  registerUser(user: FormGroup) {
    if (user.valid) {
      let creds: any = {email: user.value.email, password: user.value.password};
      return this.afAuth.auth.createUserWithEmailAndPassword(creds.email, creds.password)
      .then((userRecord) => {
        this.db.object('/users/' + userRecord.uid).set({ 'userId': userRecord.uid }).then(_ =>
        this.router.navigate(['/']));
      })
      .catch((error) => {
        throw error;
      });
    }
  }

  toggleAuth(val) {
    if (val) {
      this.showAuth = val;
    } else {
      this.showAuth = val;
    }
  }

}
