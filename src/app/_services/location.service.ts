import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Constants } from "../_helpers/constants";

@Injectable()
export class LocationService {

    constructor(private _http: Http) {

    }

    getAllCountries() {
        return this._http.get(Constants.API_ENDPOINT + 'countries/', this.jwt()).map((response: Response) => response.json())
    }

    getStates(id: number) {
        return this._http.get(Constants.API_ENDPOINT + 'states/' + id, this.jwt()).map((response: Response) => response.json())
    }

    getCities(id: number) {
        return this._http.get(Constants.API_ENDPOINT + 'cities/' + id, this.jwt()).map((response: Response) => response.json())
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