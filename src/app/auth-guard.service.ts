import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authenticationService.authenticated$
      .take(1)
      .do(authenticated => {
        if (!authenticated) {
          // not authenticated route home
          this.router.navigate(['/']);
        } else {
          this.authenticationService.uid$.take(1).subscribe( val => {
            let routeParam = route.url[1].path;
            if (val != routeParam){
              // not right user route home
              this.router.navigate([`profile/${val}`]);
            }
          });
        }
      });
  }
}
