import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Constants} from "../_helpers/constants";
import {User} from "../_models/index";

@Injectable()
export class SalaryService {
    constructor(private http:Http) {
    }

    getAll() {
        return this.http.get(Constants.API_ENDPOINT + 'salaries/', this.jwt()).map((response:Response) => response.json());
    }

    create(user:User) {
        return this.http.post(Constants.API_ENDPOINT + 'vacancies', user, this.jwt()).map((response:Response) => response.json());
    }

    update(user:User) {
        return this.http.put(Constants.API_ENDPOINT + 'vacancies/' + user.id, user, this.jwt()).map((response:Response) => response.json());
    }

    delete(id:number) {
        return this.http.delete(Constants.API_ENDPOINT + 'vacancies/' + id, this.jwt()).map((response:Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({'Authorization': 'Bearer ' + token});
            return new RequestOptions({headers: headers});
        }
    }
}