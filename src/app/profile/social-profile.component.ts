import {Component, OnInit} from "@angular/core";
import "../../assets/app.css";
import {Router} from "@angular/router";
import {ProfileService} from "../_services/profile.service";
import {Profile} from "../_models/index";
import {AlertService, AuthenticationService} from "../_services/index";
import {GlobalVars} from "../_helpers/globals";
import {Constants} from "../_helpers/constants";

declare const FB:any;


@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'social-profile.component.html',
})


export class SocialProfileComponent implements OnInit {
    profiles:Profile[] = [];
    loading:boolean;
    currentUser:any;
    sources:any;
    skills:any;
    FB:any;
    friends:any;

    constructor(private router:Router, private profileService:ProfileService, private alertService:AlertService,
                private global:GlobalVars, private authenticationService:AuthenticationService) {


        FB.init({
            appId: Constants.FACEBOOK_APP_ID,
            cookie: false,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.9' // use graph api version 2.9
        });


    }


    ngOnInit() {
        this.loading = true;
        this.currentUser = this.authenticationService.getUser();

        FB.login(response => {
            if (response.authResponse) {

                FB.api(this.currentUser.social_id + '/taggable_friends', (meResponse => {
                    this.friends = meResponse.data;
                }));


            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });


    }


}