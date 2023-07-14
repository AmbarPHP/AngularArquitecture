import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Constants } from "../../_helpers/constants";
import { User } from "../../_models/index";

@Injectable()
export class RecruiterCompanyService {

    constructor(private http: Http) {
    }

    get() {
        return this.http.get(Constants.API_ENDPOINT + 'recruiter/company/', this.jwt()).map((response: Response) => response.json());
    }

    post(data) {
        return this.http.post(Constants.API_ENDPOINT + 'recruiter/company/', JSON.stringify(data), this.jwt()).map((response: Response) => response.json());
    }

    photo(formData) {
        return this.http.post(Constants.API_ENDPOINT + 'company/photo/photo.jpg/', formData, this.imagejwt()).map(res => res.json())
    }

    private imagejwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token, });
            return new RequestOptions({ headers: headers });
        }
    } 


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