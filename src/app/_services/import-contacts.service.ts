import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Constants } from "../_helpers/constants";

@Injectable()
export class ImportContactsService {

    constructor(private http: Http) {}

    gmailInformation: any = {
        connection: []
    }
    outlookInformation: any;

    importContacts(contacts) {
        return this.http.post(Constants.API_ENDPOINT + 'create-profile/', JSON.stringify(contacts), this.jwt()).map((res: Response) => res.json());
    }

    getOutlookContacts(token) {
        return this.http.get('https://outlook.office.com/api/beta/me/contacts', this.outlookToken(token)).map((res: Response) => res.json());
    }

    importContactsFile(file) {
        console.log("file", file)
        return this.http.post(Constants.API_ENDPOINT + 'create-profile-file/', file, this.jwtFile()).map((res: Response) => res.json());
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

    private outlookToken(outlookToken) {
        // create authorization header with jwt token
        let auth_type = 'Bearer';
        let token = outlookToken;
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json'});
            return new RequestOptions({ headers: headers });
        }
    }

    private jwtFile() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token});
            return new RequestOptions({ headers: headers });
        }
    }
}