import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Constants } from "../_helpers/constants";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MembershipService {

    constructor(private http: Http) {}

    userMembership$: Subject<any> = new Subject<any>();

    getUserMembership() {
        return this.http.get(Constants.API_ENDPOINT + 'user/memberships/', this.jwt()).map((response: Response) => response.json());
    }

    getMemberships() {
        return this.http.get(Constants.API_ENDPOINT + 'memberships/', this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}