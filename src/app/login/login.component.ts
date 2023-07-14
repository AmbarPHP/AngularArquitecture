import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService, AuthenticationService, CartService } from "../_services/index";
import { Constants } from "../_helpers/constants";
import { GlobalVars } from "../_helpers/globals";

declare const FB: any;

declare const IN: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',

})

export class LoginComponent implements OnInit {
    type: any;
    resp: any;
    response: any;
    model: any = {};
    loading = false;
    returnUrl: string;
    callbackUrl: string;
    p: any;
    cart_id: any;
    currentUser: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private global: GlobalVars,
        private cartService: CartService) {

    }


    ngOnInit() {

    }




}