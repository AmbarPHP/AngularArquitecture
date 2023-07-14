import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService} from "../_services/index";

declare const IN: any;

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit {


    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) {


    }

    ngOnInit() {

    }


}