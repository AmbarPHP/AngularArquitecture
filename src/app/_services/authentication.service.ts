import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { User } from '../_models/index';
import { Constants } from '../_helpers/constants';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Output, EventEmitter } from '@angular/core';
import { MembershipService } from './membership.service';

@Injectable()
export class AuthenticationService {
    loggedIn: boolean;
    linkedinValidationEmail: boolean;
    typeOfUser = '';

    @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();
    @Output() getType: EventEmitter<any> = new EventEmitter();

    constructor(private http: Http,
                private _membershipService: MembershipService) {
    }

    login(username: string, password: string, isRecruiter?: boolean) {
        return this.http.post(Constants.API_ENDPOINT + 'auth/login/', JSON.stringify({
            username: username,
            password: password
        }), this.headers())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (response.json().auth_token) {
                    const user = new User();
                    user.firstName = username;
                    // if (isRecruiter) {
                    //     user.type = 'recruiter';
                    // } else {
                    //     user.type = 'candidate';
                    // }
                    user.type = response.json().type;
                    user.token = response.json().auth_token;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log('hacinedo login', user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', JSON.stringify(user.token));
                    localStorage.setItem('auth_type', 'Token');
                    this.getUserMembership();
                    this.me();
                    this.profile();
                }
            });
    }

    profile() {
        const user = this.getUser();
        if ((user) != null) {
            if (!(user.user_type)) {
                this.http.get(Constants.API_ENDPOINT + 'login-profile/', this.jwt())
                    .map(res => res.json()).subscribe((data) => {
                        const user = this.getUser();
                        if (user) {
                            user.type = data.user_type;
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            // this.getType.emit(data.user_type);
                            this.getLoggedIn.emit(true);
                        }
                    });
            } else {
                alert(user);
                this.getType.emit(user.user_type);
                this.getLoggedIn.emit(true);
            }
        }
    }

    me() {
        return this.http.get(Constants.API_ENDPOINT + 'auth/me/', this.jwt())
            .map(res => {
                const user = this.getUser();
                user.id = res.json().obfuscated_id;
                localStorage.setItem('currentUser', JSON.stringify(user));
                return res.json();
            });
    }

    djangoSocialAuth(backend: string, client_id: string, client_secret: string, token: string, reference_code?) {
        return this.http.post(Constants.API_ENDPOINT + 'social-auth/convert-token', JSON.stringify({
            grant_type: 'convert_token',
            backend: backend,
            client_id: client_id,
            reference_code: reference_code,
            code: '',
            client_secret: client_secret,
            token: token
        }), this.headers())
            .map(res => res.json());
    }


    facebookLogin(fbUser, token, type?, reference_code?) {
        const user = new User();
        user.firstName = fbUser.first_name;
        user.social_id = fbUser.id;
        user.email = fbUser.email;
        user.type = type;
        user.lastName = fbUser.last_name;
        user.picture = fbUser.picture.data.url;
        user.description = '';
        user.cart_id = '';
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.getLoggedIn.emit(true);
        return this.djangoSocialAuth('facebook', Constants.CLIENT_ID, Constants.CLIENT_SECRET, token, reference_code);

    }

    getLanguage() {
        return localStorage.getItem('userLanguage');
    }

    setLanguage(lang) {
        localStorage.setItem('userLanguage', lang);
        return this.http.get(Constants.API_ENDPOINT + 'language-change/' + lang + '/', this.jwt()).map((response:Response) => response.json());
    }

    getUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    setUser(username, firstName, lastName, email, picture, description, access_token, type) {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.description = description;
        user.picture = picture;
        user.type = type;
        user.cart_id = '';
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', '"' + access_token + '"');
        this.getLoggedIn.emit(true);
        // this.me()

    }

    setUserLinkedin(username, firstName, lastName, email, picture, description, access_token, type, id) {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;
        user.description = description;
        user.picture = picture;
        user.type = type;
        user.cart_id = '';
        user.id = id;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', '"' + access_token + '"');
        this.getLoggedIn.emit(true);
        // this.me()

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart_items');
        localStorage.removeItem('token');
        localStorage.removeItem('auth_type');
        this.getLoggedIn.emit(true);
    }

    isLoggedIn() {
        if (localStorage.getItem('currentUser')) {
            return true;
        } else {
            return false;
        }
    }

    socialEmailValidation(id) {
        return this.http.get(Constants.API_ENDPOINT + 'validate-user/' + id + '/', this.jwt()).map((response:Response) => response.json());
    }

    socialTypeOfUser(id, type) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(Constants.API_ENDPOINT + 'validate-user/' + id + '/', JSON.stringify({type: type}), this.jwt()).map((response: Response) => response.json());
    }

    userTypeIsValid() {
        const token = localStorage.getItem('token');
        let currentUser;
        if (token) {
            currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                if (currentUser.type !== 'candidate') {
                    if (currentUser.type !== 'recruiter') {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }else{
                return true;
            }
        } else {
            return true;
        }
    }

    getUserMembership() {
        this._membershipService.getUserMembership().subscribe(res => {
            console.log("Testeo1", res);
            this._membershipService.userMembership$.next(res);
        });
    }

    // private helper methods

    private headers() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });

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
