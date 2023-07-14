import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RecruiterGuard implements CanActivate {
    current_user: any;

    constructor(private router: Router, authenticationService: AuthenticationService) {
        this.current_user = authenticationService.getUser();

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!(this.current_user) ||  (this.current_user == 'null')) {
            // not logged in so return true
            return true;
        } else {
            //there's a user check it hes candidate
            if (this.current_user.type == 'candidate') {
                return false
            }else{
                return true
            }
        }
    }
}