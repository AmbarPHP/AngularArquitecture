import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_helpers/constants';
import { Feedback } from '../_models/index';

@Injectable()
export class FeedbackService {
    constructor(private http: Http) {
    }

    create(feedback) {
        console.log(feedback);
        return this.http.post(Constants.API_ENDPOINT + 'feedback/', JSON.stringify(feedback._value), this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        const auth_type = localStorage.getItem('auth_type') || 'Bearer';
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

}
