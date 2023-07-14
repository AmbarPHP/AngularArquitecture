import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Constants } from "../../_helpers/constants";
import { User } from "../../_models/index";

@Injectable()
export class CandidateLanguageService {
    private filter: string;
    private initial_param: boolean;
    private append: string;

    constructor(private http: Http) {
    }


    get() {
         return this.http.get(Constants.API_ENDPOINT + 'candidate/language', this.jwt()).map((response: Response) => response.json());
    }

    post(data) {
        return this.http.post(Constants.API_ENDPOINT + 'candidate/language', JSON.stringify(data), this.jwt()).map((response: Response) => response.json());
    }

    delete(id) {
        return this.http.delete(Constants.API_ENDPOINT + 'candidate/language/' + id + '/', this.jwt()).map((response: Response) => response.json());
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