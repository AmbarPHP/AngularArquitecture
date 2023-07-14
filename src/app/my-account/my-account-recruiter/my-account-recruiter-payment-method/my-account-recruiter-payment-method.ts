import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../_services/cart.service';

@Component({
    selector: 'my-account-recruiter-payment-method',
    templateUrl: 'my-account-recruiter-payment-method.html',
    styleUrls: ['my-account-recruiter-payment-method.scss']
})

export class MyAccountRecruiterPaymentMethod implements OnInit {

    constructor(private _cartService: CartService) {}

    userCards: any;

    ngOnInit() {
        this._cartService.getUserCreditCards().subscribe(res => {
            this.userCards = res;
            console.log("cards", this.userCards);
        }, err => {
            console.log("Cards Error", err);
        });
    }
}