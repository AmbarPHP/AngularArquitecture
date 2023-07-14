import { Component } from '@angular/core';
import { AlertService, CartService, AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';
// import {FormGroup, FormBuilder} from "@angular/forms";
import { Constants } from '../../_helpers/constants';
import { Message } from 'primeng/primeng';
import { ProfileService } from '../../_services/profile.service';
import { MembershipService } from '../../_services/membership.service';

declare const swal: any;
declare var OpenPay: any;

@Component({
    selector: 'checkout-component',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})

export class CheckoutComponent {
    promocode: any;

    loading: boolean;
    currentUser: any;
    cart: any;
    private OPEN_PAY_PUBLIC_KEY: string;
    private OPEN_PAY_API_KEY: string;
    private actionUrl: string;
    private _total: any = 0;
    private total: any;
    private card: any;
    private value: any;
    private _this: any;
    private token_id: any;
    private items: any = [];
    itemsIds: any;
    msgs: Message[] = [];

    constructor(private alertService: AlertService,
        private cartService: CartService,
        private authenticationService: AuthenticationService,
        private router: Router,
        private _profileService: ProfileService,
        private _membershipService: MembershipService) { }


    ngOnInit() {
        this.loadAllItems();
        this.token_id = '';
        this._this = this;
        this.card = [];
        this.loading = true;
        this.currentUser = this.authenticationService.getUser();
        this.actionUrl = Constants.API_ENDPOINT + '/cart-checkout/' + this.currentUser.cart_id;
        // initialize to page 1

        this.cartService.getAll(this.currentUser.cart_id).subscribe(items => {
            this.loading = false;
            this.total = items.total;
        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    loadAllItems() {
        this.currentUser = this.authenticationService.getUser();
        this.cartService.getAll(this.currentUser.cart_id).subscribe(items => {
            this.loading = false;
            this.items = items.items;
            this.total = items.total;
        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    private pay(value) {
        console.log('valuebefore', value);
        this.value = value._value;
        console.log('value', this.value);
        console.log('promocode', this.value.promocode);
        this.loading = true;

        OpenPay.setId(Constants.OPENPAY_ID);
        OpenPay.setApiKey(Constants.OPENPAY_PUBLIC_KEY);

        this.value.session_id = OpenPay.deviceData.setup('payment-form', 'deviceIdHiddenFieldName');
        this.value.promocode = this.promocode;
        this.loading = true;
        console.log('Valor promocode', this.promocode);
        if (this.promocode !== '' && this.promocode !== undefined) {
            console.log('promocodebloque', this.promocode);
            this.djangoCartCheckout(this.currentUser.cart_id, this.value);
        } else {
            console.log('openpay');
            new Promise((resolve, reject) => {
                OpenPay.token.extractFormAndCreate('payment-form', function (response) {
                    return resolve(response.data.id);
                }, function (response) {
                    const desc = response.data.description !== undefined ? response.data.description : response.message;
                    swal('ERROR [' + response.status + '] ' + desc);
                    reject();
                });
            }).then(args => {
                this.value.token = args;
                this.djangoCartCheckout(this.currentUser.cart_id, this.value);

            }).catch(err => {
                this.loading = false;
                console.log('Error test', err);
            });
        }
    }

    private payWithPromocode(value) {
        this.loading = true;
        this.value = value._value;

        OpenPay.setId(Constants.OPENPAY_ID);
        OpenPay.setApiKey(Constants.OPENPAY_PUBLIC_KEY);

        this.value.session_id = OpenPay.deviceData.setup('payment-form', 'deviceIdHiddenFieldName');
        // this.value.promocode = this.promocode;
        this.loading = true;
        console.log('open pay');
        console.log(this.value.promocode_type);

        if (this.value.promocode_type === 'f') {
            this.djangoCartCheckout(this.currentUser.cart_id, this.value);
        } else {
            new Promise((resolve, reject) => {
                OpenPay.token.extractFormAndCreate('payment-form', function (response) {
                    return resolve(response.data.id);
                }, function (response) {
                    const desc = response.data.description !== undefined ? response.data.description : response.message;
                    swal('ERROR [' + response.status + '] ' + desc);
                    reject();
                });
            }).then(args => {
                this.value.token = args;
                this.djangoCartCheckout(this.currentUser.cart_id, this.value);
            });

        }

    }

    djangoCartCheckout(cart_id, value) {
        this.cartService.checkout(cart_id, value).subscribe(items => {
            this.cartService.getAll(cart_id).subscribe(res => {
                this.loading = false;
                for (let i = 0; i < res.items.length; i++) {
                    if (res.items[i].type === 'Membership') {
                        this._membershipService.getUserMembership().subscribe(membership => {
                            this._membershipService.userMembership$.next(membership);
                        });
                        swal('¡Felicidades!', 'Tu orden con folio\'' + items.id + '\' fue creada exitosamente. Ya puedes hacer uso de tus perfiles.', 'success');
                        this.router.navigate(['/profiles']);
                        this.cartService.removeProfileArray(this.currentUser, this.itemsIds, 'membership');
                        localStorage.removeItem('cart_items');
                        this._profileService.checkoutCompleted = true;
                        return;
                    } else {
                        swal('¡Felicidades!', 'Tu orden con folio\'' + items.id + '\' fue creada exitosamente. Ya puedes hacer uso de tus perfiles.', 'success');
                        this.router.navigate(['/talent']);
                        this.cartService.removeProfileArray(this.currentUser, this.itemsIds);
                        localStorage.removeItem('cart_items');
                        this._profileService.checkoutCompleted = true;
                        return;
                    }
                }
            }, err => {
                swal('Ha ocurrido un error al procesar el pago');
                console.log('Aqui 1');
            });
        },
            error => {
                // this.alertService.error(error);
                console.log('Error checkout', error);
                this.loading = false;
                swal(error._body);
                console.log('Aqui 2', error);
            });
    }

    getPayEvent(event) {
        // First remove spaces and limit string length to 16
        event.value.number = event.value.number.replace(/\s/g, '');
        event.value.number = event.value.number.substring(0, 16);
        this.pay(event);
    }

    getPromocode(event) {
        this.payWithPromocode(event);
    }

    getItemsIDs(event) {
        this.itemsIds = event;
    }

    removeFromCart(event) {
        // this.loading = true;
        let profileType: string;
        if (event.type === 'Membership') {
            profileType = 'membership';
        }

        if (event.type === 'Profiles') {
            profileType = 'profile';
        }

        event = event.profile;
        console.log('Evento', event);
        this.cartService.removeProfile(this.currentUser, event.id, profileType).subscribe(() => {
            this.loadAllItems();
            this.msgs = [];
            this.msgs.push({
                severity: 'info',
                summary: '',
                detail: 'Profile removed from checkout.'
            });

        },
            error => {
            });
    }
}
