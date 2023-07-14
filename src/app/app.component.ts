import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import { CartService } from './_services';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserService, AuthenticationService, VacancyService, AlertService } from './_services/index';
import { User } from './_models/index';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IntroComponent } from './intro/intro.component';
import { IframeService } from './_services/iframe.service';
import { Subject } from 'rxjs/Rx';
import { window } from 'rxjs/operator/window';
import { RecruiterPersonalInformationService } from './_services/recruiter/personal-info';
import { MembershipService } from './_services/membership.service';
declare var mixpanel: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.scss']
})


export class AppComponent implements OnInit {
    jsonLD: any;
    type: any = '';
    loggedIn: boolean;
    cartLoaded: boolean;
    currentUser: User;
    users: User[] = [];
    landing = false;
    iframeView = false;
    view = false;
    userMembership: any;

    constructor(private userService: UserService,
                private _vacancyService: VacancyService,
                private cartService: CartService,
                private _alertService: AlertService,
                private authenticationService: AuthenticationService,
                private router: Router,
                public translate: TranslateService,
                private _iframeService: IframeService,
                private location: Location,
                private _recruiterPersonalInformationService: RecruiterPersonalInformationService,
                private _membershipService: MembershipService) {
        // this.iframeView = this._iframeService.iframeView;
        this.loggedIn = this.authenticationService.isLoggedIn();
        this.getUserMembeshipSubject();
        this.currentUser = this.authenticationService.getUser();
        if (this.currentUser) {
            this.type = this.currentUser.type;
            this.cartLoaded = (this.currentUser.cart_id !== '');
            if (this.type === 'recruiter' || this.type === 'r' ) {
                this.getUserMembership();
            }
        }

        cartService.cartLoaded.subscribe(bool2 => {
            this.cartLoaded = bool2;
        });

        translate.addLangs(['es', 'en']);
        translate.use('en');

        this.router.events.subscribe(route => {

            if (authenticationService.getLanguage()) {
                translate.use(authenticationService.getLanguage());
            } else {
                const browserLang: string = translate.getBrowserLang();
                translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
                authenticationService.setLanguage(browserLang);
            }

            translate.setDefaultLang('es');



            // If user is logged in, check type according to profile.
            if (this.loggedIn) {
                authenticationService.profile();
            }

            authenticationService.getType.subscribe(type => {
                this.type = type;
            });

            authenticationService.getLoggedIn.subscribe(bool => {
                if (bool) {
                    this.currentUser = this.authenticationService.getUser();
                    this.loggedIn = this.authenticationService.isLoggedIn();
                }
            });

        });

    }

    getAllVacanciesGoogle() {
        this._vacancyService.getGoogleAll().subscribe(res => {
            this.jsonLD = res;
      },
        err => {
            this._alertService.error(err);
        });
    }



    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('auth_type');
        this._membershipService.userMembership$.next(null);
        this.loggedIn = this.authenticationService.isLoggedIn();
        this.currentUser = this.authenticationService.getUser();
        this.authenticationService.getLoggedIn.emit(true);
        this.router.navigate(['/landing']);

    }

    languageChange(langVal) {
        this.authenticationService.setLanguage(langVal);
        this.translate.use(langVal);
    }

    showLoginModal() {
        $('#loginModal').modal({
            backdrop: 'static'
        });
    }

    closeLoginModal() {
        $('#loginModal').modal('hide');
    }

    showSignupModal() {
        $('#signupModalBtn').modal('toggle');
    }


    ngOnInit() {
        // if(localStorage.getItem('currentUser')) {
        //     var userMix = JSON.parse(localStorage.getItem('currentUser'));
        //     mixpanel.register({
        //         "user": userMix
        //     });
        // } else {

        // }

        this.authenticationService.userTypeIsValid();
        console.log(this.type, this.currentUser);
        this._iframeService.iframeView$.subscribe(res => {
            this.iframeView = res;
        });
        this.getAllVacanciesGoogle();
    }

    openImportContactsModal() {
        this.router.navigate(['/profiles']);
        $('#importContactsModal').modal('show');
    }

    goToImportContacts() {}

    openFeedbackModal() {
        $('#feedbackModal').modal({
            backdrop: 'static'
        });
    }

    get hideHeaderAndFooter() {
        if (this.location.path() == '/team' || this.location.path() == '/team/1' || this.location.path() == '/team/2' || this.location.path() == '/team/3' || this.location.path() == '/team/4' || this.location.path() == '/team/5' || this.location.path() == '/team/6') {
            return false;
        } else {
            return true;
        }
    }

    // ngDoCheck() {
    //     let currentUser;
    //     let token = localStorage.getItem('token');
    //     if(token) {
    //         currentUser = this.authenticationService.getUser();
    //         if(currentUser.type != "recruiter" && currentUser.type != "candidate") {
    //             console.log("doCheck");
    //             // this.router.navigate(['/login'])
    //         }

    //     }
    // }

    goToAccountMembership() {
        this._recruiterPersonalInformationService.membershipState = true;
        this.router.navigate(['/account']);
    }

    getUserMembership() {
        this._membershipService.getUserMembership().subscribe(res => {
            // this.userMembership = res;
            this._membershipService.userMembership$.next(res);
            // this.userMembership = this._membershipService.userMembership$;
        });
    }

    getUserMembeshipSubject() {
        this._membershipService.userMembership$.subscribe(res => {
            this.userMembership = res;
        });
    }

}
