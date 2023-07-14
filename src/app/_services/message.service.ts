import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Constants} from "../_helpers/constants";
import {User} from "../_models/index";

@Injectable()
export class MessageService {
    constructor(private http:Http) {
    }

    getAll(id) {
        console.log(id);
        return this.http.get(Constants.API_ENDPOINT + 'chat/'+id+'/', this.jwt()).map((response:Response) => response.json());
    }

    create(user:User) {
        return this.http.post(Constants.API_ENDPOINT + 'chat/snowflake/', user, this.jwt()).map((response:Response) => response.json());
    }

    update(user:User) {
        return this.http.put(Constants.API_ENDPOINT + 'chat/snowflake/' + user.id, user, this.jwt()).map((response:Response) => response.json());
    }

    delete(id:number) {
        return this.http.delete(Constants.API_ENDPOINT + 'chat/snowflake/' + id, this.jwt()).map((response:Response) => response.json());
    }

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