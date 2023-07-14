import { Injectable, Output, EventEmitter } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Constants } from "../_helpers/constants";
// import { AuthenticationService } from "../_services/index";
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CartService {
    headers: any;
    options: any;
    user: any;

    constructor(private http: Http, private authenticationService: AuthenticationService) {

    }

    @Output() cartLoaded: EventEmitter<any> = new EventEmitter();


    setCart(user, cart_id) {
        if (user.cart_id === '' || typeof user.cart_id === 'undefined') {
            user.cart_id = '' + cart_id;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return user.cart_id;
        } else {
            return user.cart_id;
        }
    }

    createCart() {
        const cart_items = this.getLocalCartItems();
        return this.http.post(Constants.API_ENDPOINT + 'carts/', JSON.stringify(cart_items), this.jwt()).map((response: Response) => response.json());
    }


    getOrCreateLocalCart() {
        let cart_items = JSON.parse(localStorage.getItem('cart_items'));

        if (!(cart_items)) {
            cart_items = [];
            localStorage.setItem('cart_items', JSON.stringify(cart_items));
        }

        return cart_items;
    }


    getLocalCartItems() {
        const cart_items = JSON.parse(localStorage.getItem('cart_items'));
        if (cart_items) {
            return cart_items;
        } else {
            return {};
        }
    }

    getAnonCart() {
        let cart_items = this.getLocalCartItems();
        return this.http.post(Constants.API_ENDPOINT + 'cart-items-anon/', cart_items, this.jwt()).map((response: Response) => response.json());
    }

    getAll(cart_id) {
        console.log(cart_id);
        return this.http.get(Constants.API_ENDPOINT + 'cart-items/' + cart_id + '/', this.jwt()).map((response: Response) => response.json());
    }

    addLocalProfile(id) {
        console.log(id);
        const cart_items = this.getOrCreateLocalCart();
        if (!(cart_items.indexOf(id) > -1)) {
            cart_items.push({ 'type': 'profile', 'id': id });
        }
        localStorage.setItem('cart_items', JSON.stringify(cart_items));
    }

    addLocalMembership(id) {
        console.log(id);
        const cart_items = this.getOrCreateLocalCart();
        if (!(cart_items.indexOf(id) > -1)) {
            cart_items.push({ 'type': 'membership', 'id': id });
        }
        localStorage.setItem('cart_items', JSON.stringify(cart_items));
    }

    addProfile(user, id, type = 'profile') {
        console.log('Type', type);
        // When a profile is added to the cart we need to remove first sombe membership that is in the cart.
        if (type === 'profile') {
            console.log('Checar cartid', user.cart_id);
            this.getAll(user.cart_id).subscribe(res => {
                if (res.items.length > 0) {
                    for (let i = 0; i < res.items.length; i++) {
                        if (res.items[i].type === 'Membership') {
                            this.removeProfile(user, res.items[i].profile.id, 'membership').subscribe(response => {
                                console.log('Membership borrados', response);
                            }, err => {
                                console.log('un error ha ocurrido');
                            })
                        }
                    }
                }
            });
        }
        let item = JSON.stringify({ 'id': id, 'action': 'add', 'type': type });
        return this.http.post(Constants.API_ENDPOINT + 'cart-items/' + user.cart_id + '/', item, this.jwt()).map((response: Response) => response.json());
    }

    removeProfile(user, id, type = 'profile') {
        let item = JSON.stringify({ 'id': id, 'action': 'delete', 'type': type });

        return this.http.post(Constants.API_ENDPOINT + 'cart-items/' + user.cart_id + '/', item, this.jwt()).map((response: Response) => response.json());
    }

    removeProfileArray(user, arr, type = 'profile') {
        let item = JSON.stringify({ 'arr': arr, 'action': 'delete', 'type': type });
        return this.http.post(Constants.API_ENDPOINT + 'cart-items-arr/' + user.cart_id + '/', item, this.jwt()).map((response: Response) => response.json());
    }


    update(cart_id, id) {
        let item = JSON.stringify({ 'id': id });
        return this.http.put(Constants.API_ENDPOINT + 'cart-items/' + cart_id + '/', item, this.jwt()).map((response: Response) => response.json());
    }

    checkout(cart_id, card = null) {
        card = JSON.stringify(card);
        return this.http.post(Constants.API_ENDPOINT + 'cart-checkout/' + cart_id + '/', card, this.jwt()).map((response: Response) => response.json());
    }

    userPromocode() {
        return this.http.get(Constants.API_ENDPOINT + 'user-promocode/', this.jwt()).map((response: Response) => response.json());
    }

    getUserCreditCards() {
        return this.http.get(Constants.API_ENDPOINT + 'user/cards/', this.jwt()).map((response: Response) => response.json());
    }

    buyProfileWithCredit(profile_id) {
        const profile = JSON.stringify({ 'profile_pk': profile_id });
        return this.http.post(Constants.API_ENDPOINT + 'zource-profile/', profile, this.jwt()).map((response: Response) => response.json());
    }


    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        } else {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}
