import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router){}

  canActivate (
    //idk what these 2 do
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        //if not logged in goto login page
        if (!loggedIn) {
          console.log('access denied')
          this.route.navigate(['login']);
        }
      });
  }
}
