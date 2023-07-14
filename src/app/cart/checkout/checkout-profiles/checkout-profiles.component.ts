import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/primeng';
import { AlertService, CartService, AuthenticationService } from "../../../_services/index";
import { Constants } from "../../../_helpers/constants";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
    selector: 'checkout-profiles',
    templateUrl: 'checkout-profiles.component.html',
    styleUrls: ['checkout-profiles.scss']
})

export class CheckoutProfilesComponent {

    @Input()
    items: any;

    @Input()
    total: any;

    @Output()
    sendRemoveFromCartEvent: EventEmitter<any> = new EventEmitter<any>();

    loading: boolean;
    currentUser: any;

    msgs: Message[] = [];



    constructor(private alertService: AlertService, private cartService: CartService, private authenticationService: AuthenticationService, private router: Router, fb: FormBuilder) {


    }


    ngOnInit() {
        console.log("Items", this.items);
        this.currentUser = this.authenticationService.getUser();
    }


    private loadAllItems() {
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

    removeFromCart(item) {
        console.log("Prueba type", item)
        this.sendRemoveFromCartEvent.emit(item);
    }




}