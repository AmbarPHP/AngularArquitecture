import { Component, OnInit } from "@angular/core";
import "../../assets/app.css";
import { AlertService, AuthenticationService, CartService, PagerService } from "../_services/index";
import { Constants } from '../_helpers/constants';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';
import { and } from "@angular/router/src/utils/collection";

@Component({
    selector: 'app',
    templateUrl: 'cart.component.html',
    styleUrls: ['style.css'],

})


export class CartComponent implements OnInit {
    itemArr: any = [];
    loading: boolean;
    currentUser: any;
    cart: any;
    // pager object
    pager: any = {};
    msgs: Message[] = [];

    profileListView = false;
    profiles: any;

    selectedProfiles: any = [];
    zourcedProfile: any = [];

    savedSelectedProfiles: any = [];
    pagedItems: any[];
    p: any;
    cart_id: any;
    searchField: any;
    private filter: any;
    private actionUrl: string;
    private total: any;
    totalPrice: any;
    private card: any;
    private _this: any;
    private token_id: any;
    private items: any = [];

    complexForm: FormGroup;

    constructor(private alertService: AlertService, private route: ActivatedRoute, private cartService: CartService, private authenticationService: AuthenticationService, private router: Router, fb: FormBuilder, private pagerService: PagerService, private _mixpanelTrackerService: mixpanelTrackerService) {
    }

    ngOnInit() {

        this.currentUser = this.authenticationService.getUser();

        this.route.queryParams.subscribe(params => {
            const type = params['type'];
            const object_id = params['id'];
            if (type && object_id) {
                if (type === 'membership') {
                    if (!(this.currentUser)) {
                        this.cartService.addLocalMembership(object_id);
                        this.msgs.push({ severity: 'info', summary: '', detail: 'Membresía agregada al carrito exitosamente.\n Regístrate para pagar.' });

                    } else {
                        this.cartService.addProfile(this.currentUser, object_id, 'membership').subscribe(() => {
                            this.msgs = [];
                            this.msgs.push({ severity: 'info', summary: '', detail: 'Membresía agregada al carrito exitosamente.' });
                        });
                    }
                }
                if (type === 'profile') {
                    if (!(this.currentUser)) {
                        this.cartService.addLocalProfile(object_id);
                        this.msgs.push({ severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.' });

                    } else {
                        this.cartService.addProfile(this.currentUser, object_id, 'profile').subscribe(() => {
                            this.msgs = [];
                            this.msgs.push({ severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.\n Regístrate para pagar.' });
                        });
                    }
                }
            }
        });

        if (!this.authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } });
        }
        this._mixpanelTrackerService.sendVisitedPage('Cart');
        this.pagedItems = [];
        this.token_id = '';
        this._this = this;
        this.card = [];
        this.loading = true;
        this.currentUser = this.authenticationService.getUser();
        if (this.currentUser) {
            this.actionUrl = Constants.API_ENDPOINT + '/cart-checkout/' + this.currentUser.cart_id;
            this.loadAllItems();
        } else {
            this.loadAnonCart();
        }

    }


    removeFromCart() {
        this.loading = true;
        if (this.currentUser) {
            this.cartService.removeProfileArray(this.currentUser, this.selectedProfiles).subscribe(() => {
                this.msgs = [];
                const language = localStorage.getItem('userLanguage');
                if (language === 'en') {
                    this.msgs.push({
                        severity: 'info',
                        summary: '',
                        detail: 'Profiles removed from cart.'
                    });
                } else {
                    this.msgs.push({
                        severity: 'info',
                        summary: '',
                        detail: 'Perfiles removidos del carrito exitosamente.'
                    });
                }
                this.selectedProfiles = [];
                this.savedSelectedProfiles = [];
                this.loadAllItems();
            }, error => {
                console.log('Error', error);
            });
        } else {
            // If user is not logged in we have to remove items from localStorage('cart_items')
            const cart = JSON.parse(localStorage.getItem('cart_items'));
            const newCart = [];
            const newCartCompleted = [];

            // Create array with profile ids selected in cart
            for (let i = 0; i < cart.length; i++) {
                newCart.push(cart[i].id);
            }

            // Removing selected items from newCartArray
            for (let i = 0; i < this.selectedProfiles.length; i++) {
                for (let j = 0; j < newCart.length; j++) {
                    if (this.selectedProfiles[i] === newCart[j]) {
                        newCart.splice(newCart.indexOf(newCart[j]), 1);
                    }
                }
            }

            for (let i = 0; i < newCart.length; i++) {
                newCartCompleted.push({
                    'type': 'profile',
                    'id': newCart[i]
                });
            }

            console.log('new cart', newCart);
            console.log('new cart', newCartCompleted);
            this.selectedProfiles = [];
            this.savedSelectedProfiles = [];
            localStorage.setItem('cart_items', JSON.stringify(newCartCompleted));
            this.loadAnonCart();
            // this.cartService.addLocalProfile(p);
        }
    }

    deselectAll() {
        this.selectedProfiles = [];
    }

    zource() {
        this.router.navigate(['/profiles']);
    }

    setPage(page: number) {
        this.loading = true;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this.pagerService.getPager(this.profiles.length, page, this.pagerService.profileCardsQty);
        // get current page of items
        this.pagedItems = this.profiles.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.loading = false;
    }

    private loadAnonCart() {
        this.loading = true;
        this.currentUser = this.authenticationService.getUser();
        this.cartService.getAnonCart().subscribe(items => {
            this.loading = false;
            this.profiles = items.items;
            this.total = items.items.length;
            this.totalPrice = items.total;
            this.setPage(1);
        },
            error => {
                localStorage.removeItem('cart_items');
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private loadAllItems() {
        this.loading = true;
        this.currentUser = this.authenticationService.getUser();
        this.cartService.getAll(this.currentUser.cart_id).subscribe(items => {
            console.log('items', items);
            this.loading = false;
            this.profiles = items.items;
            this.total = items.items.length;
            this.totalPrice = items.total;
            this.setPage(1);

            if (this.profiles) {
                for (let i = 0; i < this.profiles.length; i++) {
                    if (this.profiles[i].id) {
                        this.itemArr.push(this.profiles[i].id);
                    }
                }
            }

        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private checkout(value) {
        this.router.navigate(['/cart/checkout']);
    }

    removeSavedSelectedProfile(event) {
        const arr = this.savedSelectedProfiles.filter(function (el) {
            return el.id !== event;
        });

        this.savedSelectedProfiles = arr;
    }

    removeSelectedProfile(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    getPagination(event) {
        console.log('getPagination', event);
        // this.pagedItems = event;
        this.setPage(event);
    }

    getSelectedProfiles(event) {
        this.selectedProfiles.push(event);
        this.savedSelectedProfiles.push({ id: event });
        console.log(this.selectedProfiles);
    }

    getUnselectedProfiles(event) {
        this.removeSelectedProfile(this.selectedProfiles, event);
        this.removeSavedSelectedProfile(event);
        console.log(this.selectedProfiles);
    }

    getDeselectAll(event) {
        this.selectedProfiles = event;
        this.savedSelectedProfiles = [];
        console.log(this.selectedProfiles);
    }

    getRemoveFromCart() {
        this.removeFromCart();
    }

    getCloseModal() {
        $('#signupModal').modal('toggle');
    }

    getCloseLoginModal() {
        $('#loginModal').modal('toggle');
    }

}
