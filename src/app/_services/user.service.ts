import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_helpers/constants';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    candidateFromEmailData: any = '';

    getAll() {
        return this.http.get(Constants.API_ENDPOINT + 'users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(Constants.API_ENDPOINT + 'users/signup/', JSON.stringify(user), this.headers()).map((response: Response) => response.json());
    }

    update(user: User) {
        console.log(user);
        return this.http.put(Constants.API_ENDPOINT + 'users/' + user.id, JSON.stringify(user), this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(Constants.API_ENDPOINT + 'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    changePassword(old_password, new_password) {
        const password = {
            'old_password': old_password,
            'new_password': new_password
        }
        return this.http.post(Constants.API_ENDPOINT + 'password-change/', JSON.stringify(password), this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    private headers() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }

}