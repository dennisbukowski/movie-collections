// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { AngularFireAuth } from 'angularfire2/auth';
//
// @Component({
//   selector: 'login-component',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent implements OnInit {
//   public loginForm: FormGroup;
//
//   constructor(
//     private afAuth: AngularFireAuth,
//     private router: Router
//   ) {}
//
//   ngOnInit(): void {
//   }
//
//   onLogin(formData: FormGroup) {
//     if (formData.valid) {
//       let creds: any = {email: formData.value.email, password: formData.value.password};
//       this.afAuth.auth.signInWithEmailAndPassword(creds.email, creds.password)
//         .then(
//           (success) => {
//             console.log(success);
//             this.router.navigate(['/']);
//         })
//         .catch(function(error) { console.log(error); });
//     }
//   }
// }
