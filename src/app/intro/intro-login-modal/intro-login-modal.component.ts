import { zip } from 'rxjs/observable/zip';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, CartService, UserService } from '../../_services/index';
import { Constants } from '../../_helpers/constants';
import { GlobalVars } from '../../_helpers/globals';
// import { setTimeout } from 'timers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { checkNoChangesNode } from '@angular/core/src/view/view';
import { MembershipService } from '../../_services/membership.service';
import { ProfileService } from '../../_services/profile.service';

declare const FB: any;
declare const swal: any;

declare const IN: any;

@Component({
    moduleId: module.id.toString(),
    selector: 'intro-login-modal',
    templateUrl: 'intro-login-modal.component.html',
    styleUrls: ['intro-login-modal.component.scss'],

})

export class IntroLoginModalComponent implements OnInit {
    enableLogin = false;
    logoutParam: any;
    githubCallbackUrl: string;
    resp: any;
    response: any;
    model: any = {};
    loading = false;
    returnUrl: string;
    callbackUrl: string;
    p: any;
    cart_id: any;
    currentUser: any;
    userType: any;
    showLoginModal = true;
    showSignupModal = false;
    isRecruiter = false;
    socialUserNoExist = false;
    userTypeForm: FormGroup;
    captchaAlert = false;
    loginError = false;

    // @Input() type: string;

    @Output()
    sendCloseModalEvent: EventEmitter<any> = new EventEmitter();


    constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private global: GlobalVars,
        private cartService: CartService,
        private userService: UserService,
        private fb: FormBuilder,
        private _membershipService: MembershipService,
        private _profileService: ProfileService) {

        FB.init({
            appId: Constants.FACEBOOK_APP_ID,
            cookie: false,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.9' // use graph api version 2.9
        });
    }

    ngOnInit() {
        setTimeout(() => {
            if (this.route.snapshot.queryParams['reference-code']) {
                // get return url from route parameters or default to '/'
                var reference_code = this.route.snapshot.queryParams['reference-code'] || '';
    
                this.showLoginModal = false;
                this.showSignupModal = true;
                console.log("showing", this.showLoginModal);
                this.model.reference_code = reference_code;
            }
        }, 800);

        // Create Type of User Form
        this.createUserTypeForm();


        // reset login status
        this.logoutParam = this.route.snapshot.queryParams['logout'] || '0';

        if (this.logoutParam === '1') {
            this.authenticationService.logout();
            FB.logout(function (response) {
                // user is now logged out
            });
        }

        this.callbackUrl = Constants.API_ENDPOINT + 'social-auth/login/linkedin-oauth2?reference_code=' + this.model.reference_code;
        this.githubCallbackUrl = Constants.API_ENDPOINT + 'social-auth/login/github?reference_code=' + this.model.reference_code;


        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';

        FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });
    }

    /* FaceBook */

    // onLinkedinLoginClick() {
    //     this.authenticationService.socialEmailValidation()
    // }

    onFacebookLoginClick() {
        if (!this.enableLogin) {
            console.log('clickear capctha');
            this.captchaAlert = true;
        } else {
            let type;
            // if(this.isRecruiter === true) {
            //     type = 'recruiter'
            // } else {
            //     type= 'candidate'
            // }
            console.log('type face', type);
            this.cartService.cartLoaded.emit(false);
            this.loading = true;
            FB.login(response => {
                console.log('login res', response);
                if (response.authResponse) {
                    this.global.setMyGlobalVar(FB);
                    console.log('global', this.global);
                    console.log('response click', response);
                    FB.api('me?fields=id,name,first_name,last_name,email,picture', (meResponse => {
                        console.log('response getuser', meResponse);
                        this.authenticationService.facebookLogin(meResponse, response.authResponse.accessToken, '', this.model.reference_code).subscribe(data => {
                            if (data.access_token) {
                                // Set access token so user can access backend resources;
                                localStorage.setItem('token', JSON.stringify(data.access_token));
                                this.authenticationService.me().subscribe(data => {
                                    console.log('new me', data);
                                    let user = this.authenticationService.getUser();
                                    console.log('check user', user);
                                    user.id = data.obfuscated_id;
                                    this.authenticationService.socialEmailValidation(user.id).subscribe(validationRes => {
                                        user.type = validationRes.type;
                                        localStorage.setItem('currentUser', JSON.stringify(user));
                                        console.log('Validation res', validationRes);
                                        if (!validationRes.type) {
                                            $('#loginModal').modal('hide');
                                            setTimeout(() => {
                                                $('#socialUserModal').modal('toggle');
                                            }, 500);
                                        } else {
                                            this.createCartFacebookLogin(validationRes.type);
                                        }
                                    });
                                });
                            }
                        }, error => {
                            console.log('Error djangosocial', error);
                            this.loginError = true;
                            this.authenticationService.logout();
                            // swal("Login error",error,'error');
                        });
                    }));

                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, { scope: 'email, public_profile, user_friends' });
        }
    }

    createCartFacebookRegister(type?: any) {
        let userType;
        if (type) {
            userType = type;
        }

        $('#loginModal').modal('hide');
        $('#socialUserModal').modal('hide');
        console.log('aqui cart', userType);
        console.log('aqui type', type);
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id === '' || this.cart_id == null) {
            this.cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.cart_id = cart.id;
                this.cartService.setCart(this.currentUser, cart.id);
                this.cartService.cartLoaded.emit(true);
                // send the type of the login to app component

                this.authenticationService.getType.emit(userType);
                this.authenticationService.socialTypeOfUser(this.currentUser.id, userType).subscribe(res => {
                    console.log('res assigntype', res);
                    // localStorage.removeItem('currentUser');
                });
                this.authenticationService.getType.emit(userType);

                console.log('redirect', userType);
                if (userType !== 'candidate') {
                    window.location.href = '/#/register/recruiter';
                } else {
                    window.location.href = '/#/register/candidate';
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    createCartFacebookLogin(type?: any) {
        let userType;
        if (type) {
            userType = type;
        }

        $('#loginModal').modal('hide');
        console.log('aqui cart', userType);
        console.log('aqui type', type);
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id === '' || this.cart_id == null) {
            this.cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.cart_id = cart.id;
                this.cartService.setCart(this.currentUser, cart.id);
                this.cartService.cartLoaded.emit(true);
                // send the type of the login to app component

                this.authenticationService.getType.emit(userType);
                this.authenticationService.socialTypeOfUser(this.currentUser.id, userType).subscribe(res => {
                    console.log('res assigntype', res);
                    // localStorage.removeItem('currentUser');
                });
                this.authenticationService.getType.emit(userType);

                if (userType !== 'candidate') {
                    this.getUserMembership();
                    window.location.href = '/#/profiles';
                } else {
                    window.location.href = '/#/vacancies-candidate';
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    facebookRegister(userType) {
        const type = userType.userType;
        this.cartService.cartLoaded.emit(false);
        this.createCartFacebookRegister(type);
        this.loading = true;
    }

    createCart(type?: any) {
        let userType;
        if (type) {
            userType = type;
        }

        $('#loginModal').modal('hide');
        console.log('aqui cart', userType);
        console.log('aqui type', type);
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id === '' || this.cart_id == null) {
            this.cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.cart_id = cart.id;
                this.cartService.setCart(this.currentUser, cart.id);
                this.cartService.cartLoaded.emit(true);
                // send the type of the login to app component

                this.authenticationService.getType.emit(userType);

                console.log('redirect', userType);
                if (userType !== 'candidate') {
                    const route = this.router.url;
                    console.log('Routeee', route);
                    console.log('Search', route.search('profiles'));
                    if (route.search('profiles') === 1) {
                        this._profileService.checkoutCompleted = true;
                        $('#loginModal').modal('hide');
                    } else {
                        window.location.href = '/#/profiles';
                    }
                } else {
                    window.location.href = '/#/vacancies-candidate';
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    createCartRegister(isRecruiter?: boolean) {
        let type;
        $('#loginModal').modal('toggle');
        if (isRecruiter === false) {
            type = 'recruiter';
        } else {
            type = 'candidate';
        }
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id === '' || this.cart_id == null) {
            this.cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.cart_id = cart.id;
                this.cartService.setCart(this.currentUser, cart.id);
                this.cartService.cartLoaded.emit(true);
                console.log('prueba type', type);
                this.authenticationService.getType.emit(type);
                if (type !== 'candidate') {
                    this.getUserMembership();
                    window.location.href = '/#/register/recruiter';
                } else {
                    window.location.href = '/#/register/candidate';
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
        }
    }

    login() {
        this.cartService.cartLoaded.emit(false);
        this.loading = true;
        // this.model.type = this.type;
        // this.authenticationService.getType.emit(this.type);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.authenticationService.me().subscribe(dataMe => {
                        const user = this.authenticationService.getUser();
                        console.log('prueba login', user);
                        user.id = dataMe.obfuscated_id;
                        user.email = dataMe.email;
                        // localStorage.setItem('currentUser', JSON.stringify(user));
                        if (user.type !== 'candidate') {
                            this.createCart(user.type);
                        } else {
                            console.log('else aqui', user.type);
                            this.closeModal();
                            this.router.navigate(['vacancies-candidate']);
                        }
                    });
                },
                error => {
                    this.alertService.errorAlert(error._body);
                    this.loading = false;
                });
    }

    loginRegister(isRecruiter) {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password, isRecruiter)
            .subscribe(
                data => {
                    this.authenticationService.me().subscribe(data => {
                        const user = this.authenticationService.getUser();
                        user.id = data.obfuscated_id;
                        user.email = data.email;
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this.createCartRegister(isRecruiter);
                        console.log('Estoy aqui');
                        // if(this.type === 'candidate') {
                        //     this.router.navigate(['register/candidate'])
                        // }
                    });

                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }

    closeModal() {
        $('#loginModal').modal('hide');
        this.alertService.clear();
        console.log('cerrar');
        this.captchaAlert = false;
        this.model.captcha = false;
        this.enableLogin = false;
    }

    closeSocialUserModal() {
        $('#socialUserModal').modal('toggle');
    }

    goToLoginModal() {
        this.showLoginModal = true;
        this.showSignupModal = false;
        this.socialUserNoExist = false;
    }

    goToSignupModal() {
        this.showLoginModal = false;
        this.showSignupModal = true;
    }

    isRecruiterFunction(isRecruiter) {
        this.isRecruiter = isRecruiter;
    }

    register(isRecruiter: boolean = false) {
        this.loading = true;
        console.log("Test recrui", isRecruiter);
        if (isRecruiter  == false) {
            this.model.type = 'recruiter';
        } else {
            this.model.type = 'candidate';
        }
        // this.model.type = this.type;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Successful registration ', true);
                    this.loginRegister(isRecruiter);
                },
                error => {
                    const err = JSON.parse(error._body);
                    const errArray = Object.getOwnPropertyNames(err);
                    for (let i = 0; i < errArray.length; i++) {
                        this.alertService.errorAlert(err[errArray[i]]);
                    }
                    this.loading = false;
                });
    }

    createUserTypeForm() {
        this.userTypeForm = this.fb.group({
            userType: [null, Validators.required]
        });
    }

    resolved(captchaResponse: string) {
        this.enableLogin = true;
        this.captchaAlert = false;
        console.log(`Resolved captcha with response ${captchaResponse}:`);
        console.log('captcha', this.model.captcha);
    }

    linkedinClick() {
        this.captchaAlert = true;
    }

    githubClick() {
        this.captchaAlert = true;
    }

    openForgotPasswordModal() {
        console.log('aqui');
        $('#loginModal').modal('hide');
        setTimeout(() => {
            $('#forgotPasswordModal').modal('toggle');
        }, 500);
    }

    getUserMembership() {
        this._membershipService.getUserMembership().subscribe(res => {
            console.log('Testeo', res);
            this._membershipService.userMembership$.next(res);
        });
    }
}
