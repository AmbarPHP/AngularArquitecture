import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Constants} from "../_helpers/constants";
import {User} from "../_models/index";
import { Subject } from 'rxjs/Rx';

@Injectable()
export class IframeService {
    constructor(private http:Http) {
    }

    iframeView$: Subject<boolean> = new Subject();
    email = '';
    emailHasSuccess: boolean = false;
    vacancyId: any;
  
    getVacancies() {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/', this.jwt()).map((response:Response) => response.json());
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
        let token = 'e1a902ccd2eff32f4fdb9a24da3e092623daa780';
        if (token) {
            let headers = new Headers({'Authorization': 'Token' + ' ' + token, 'Content-Type': 'application/json'});
            return new RequestOptions({headers: headers});
        }
    }

}