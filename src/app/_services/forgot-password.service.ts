import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Constants} from "../_helpers/constants";
import {User} from "../_models/index";

@Injectable()
export class ForgotPasswordService {
    constructor(private http:Http) {
    }
  
    create(email) {
        return this.http.post(Constants.API_ENDPOINT + 'auth/password/reset/', JSON.stringify({'email': email}), this.headers()).map((response:Response) => response.json());
    }

    confirm() {
        return this.http.post(Constants.API_ENDPOINT + 'auth/password/reset/confirm/', JSON.stringify({}), this.headers()).map((response:Response) => response.json());
    }

    // private helper methods
    private headers() {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json'});
            return new RequestOptions({headers: headers});
        }
    }

}