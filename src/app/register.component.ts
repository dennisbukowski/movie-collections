import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
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

}
