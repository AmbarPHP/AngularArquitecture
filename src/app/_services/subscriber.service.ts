import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Constants } from "../_helpers/constants";
import { User,Subscriber } from "../_models/index";

@Injectable()
export class SubscriberService {
    constructor(private http: Http) {
    }

    create(subscriber: Subscriber) {
        return this.http.post(Constants.API_ENDPOINT + 'subscribers/', JSON.stringify(subscriber), this.jwt()).map((response: Response) => response.json());
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