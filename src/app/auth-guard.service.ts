import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CurrentUserService } from './current-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: CurrentUserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.authenticated$
      .take(1)
      .do(authenticated => {
        if (!authenticated) {          
          this.router.navigate(['/']);
        }
      });
  }
}
