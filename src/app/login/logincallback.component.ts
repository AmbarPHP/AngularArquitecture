import { CartService } from './../_services/cart.service';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService, AuthenticationService } from "../_services/index";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { User } from "../_models/index";
import { Constants } from "../_helpers/constants";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Output, EventEmitter } from "@angular/core"

declare const IN: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginCallbackComponent implements OnInit {
    user: any;
    cart_id: any;
    loading: boolean;
    type: string;
    username: any;

    @Output() getLoggedIn: EventEmitter<any> = new EventEmitter();

    access_token: any;
    firstName: any;
    lastName: any;
    picture: any;
    email: any;
    description: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private cartService: CartService) {
        this.cartService.cartLoaded.emit(false);
    }
    ngOnInit() {
        if (this.route.snapshot.queryParams['access-token']) {
            // Social Auth login
            // get return url from route parameters or default to '/'
            var type = this.route.snapshot.queryParams['type'] || '/';
            this.access_token = this.route.snapshot.queryParams['access-token'] || '/';
            this.firstName = this.route.snapshot.queryParams['firstName'] || '/';
            this.username = this.route.snapshot.queryParams['firstName'] || '/';
            this.lastName = this.route.snapshot.queryParams['lastName'] || '/';
            this.email = this.route.snapshot.queryParams['email'] || '/';
            this.picture = this.route.snapshot.queryParams['picture'] || '/';
            this.description = this.route.snapshot.queryParams['industry'] || '/';
            this.type = type
            console.log("type", this.type);
            this.authenticationService.socialEmailValidation(this.email).subscribe(res => {
                console.log('reslink', res);
                $("#linkedinRegisterModal").modal('toggle');
            })
            this.authenticationService.setUser(this.username, this.firstName, this.lastName, this.email, this.picture, this.description, this.access_token, "recruiter");
            console.log("aqui")
        } else {
            // Traditional login
            let user = this.authenticationService.getUser();
            let type = user.type;
            console.log("aqui2")
        }

        this.user = this.authenticationService.getUser();

        this.cartService.createCart().subscribe(cart => {
            this.loading = false;
            this.cart_id = cart.id;
            this.cartService.setCart(this.user, cart.id);
            this.cartService.cartLoaded.emit(true);
        },
        error => {
            this.loading = false;
        });

        // if (type == 'candidate') {
        //     this.router.navigate(['/vacancies-candidate']);
        // } else {
        //     console.log("callback..")
        //     this.router.navigate(['/profiles']);
        // }

    }
}
