import { Component, OnInit } from '@angular/core';
import '../../assets/app.css';
import { MessageService, AlertService, AuthenticationService } from '../_services/index';
import { Profile } from '../_models/index';
import { GlobalVars } from '../_helpers/globals';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { CartService } from '../_services/cart.service';

declare const ReconnectingWebSocket: any;
// declare var gapi: any;


@Component({
    templateUrl: 'intro.component.html',
    styleUrls: ['./style.css'],
    selector: 'router-outlet-2'

})


export class IntroComponent implements OnInit {
    auth2: any;
    code: any = '';
    type = 'recruiter';
    profiles: Profile[] = [];
    loading: boolean;
    currentUser: any;
    messages: any;
    friends: any;
    landing: boolean;
    modal: any;

    userTypeForm: FormGroup;
    emailValidation: boolean;

    access_token: any;
    firstName: any;
    username: any;
    lastName: any;
    id: any;
    email: any;
    picture: any;
    description: any;
    cart_id: any;

    showLoginModal = true;
    showSignupModal = false;


    constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private alertService: AlertService,
        private global: GlobalVars, private authenticationService: AuthenticationService, private fb: FormBuilder, private _cartService: CartService) {
    }


    // initGapiClient() {
    //     gapi.load('auth2', () => {
    //         this.auth2 = gapi.auth2.init({
    //             client_id: '764371843517-agq21liaq9vbspiroidokg1lbfmvrqdk.apps.googleusercontent.com',
    //             cookie_policy: 'single_host_origin',
    //             scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
    //         });
    //         this.auth2.attachClickHandler(document.getElementById('googleres'), {}, this.initClient, this.onFailure);

    //     })
    // }

    // onFailure (err) {
    //     console.log(err);
    // }

    // initClient() {
    //     // alert("skkds");
    //     console.log("initClient")
    //     gapi.load('client:auth2', () => {
    //         gapi.client.init({
    //             apiKey: 'AIzaSyDvWcoDpok4DyzMq4Btdu2vRmnLwQTbmUU',
    //             discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
    //             clientId: '764371843517-agq21liaq9vbspiroidokg1lbfmvrqdk.apps.googleusercontent.com',
    //             scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
    //         }).then(() => {
    //             // alert("Hhhoos");
    //             console.log("Hhoss");
    //             return gapi.client.people.people.connections.list({
    //                 resourceName:'people/me',
    //                 personFields: 'emailAddresses,names'
    //             });
    //         }).then(
    //             (res) => {
    //                 // alert("c");
    //                 console.log("c");
    //                 console.log("Res: " + JSON.stringify(res));
    //                 let res1 = JSON.parse(res);
    //                 console.log(res1);
    //                 //this.userContacts.emit(this.transformToMailListModel(res.result));
    //             },
    //             error => console.log("ERROR " + JSON.stringify(error))
    //         );
    //     })
    // }

    ngOnInit() {
        // setTimeout(() => this.initGapiClient(), 1000);
        this.createUserTypeForm();
        this.modal = this.route.snapshot.queryParams['modal'] || '0';

        // this.type = 'recruiter';
        // this.authenticationService.getType.emit(this.type);
        this.landing = true;

        if (this.route.snapshot.queryParams['reference-code']) {
            // get return url from route parameters or default to '/'
            var reference_code = this.route.snapshot.queryParams['reference-code'] || '';
            console.log("reference", reference_code);
            setTimeout(() => {
                $('#loginModal').modal('show');
            }, 800);
        }

        if (this.route.snapshot.queryParams['invalidType']) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser.type === '') {
                setTimeout(() => {
                    $('#linkedinRegisterModal').modal('show');
                    console.log('mostrar modal');
                }, 800);
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                let token = localStorage.getItem('token');
                token = token.replace('"', '');
                token = token.replace('"', '');
                console.log('token token', token);
                this.access_token = token;
                this.firstName = currentUser.firstName;
                this.username = currentUser.username;
                this.lastName = currentUser.lastName;
                // this.email = 'adriantobon@live.com';
                this.email = currentUser.email;
                this.picture = currentUser.picture;
                this.description = currentUser.description;
                this.id = currentUser.id;
            }
        }

        if (this.route.snapshot.queryParams['access-token']) {
            console.log('intro');
            // Social Auth login
            // get return url from route parameters or default to '/'
            // this.email = 'adriantobon@live.com'
            this.email = this.route.snapshot.queryParams['email'] || '/';
            this.id = this.route.snapshot.queryParams['id'] || '/';
            console.log('email intro', this.email);
            this.authenticationService.socialEmailValidation(this.id).subscribe(res => {
                console.log('reslink', res);
                if (res.type) {
                    console.log('aqui valid');
                    // var type = this.route.snapshot.queryParams['type'] || '';
                    const type = res.type;
                    this.id = this.route.snapshot.queryParams['id'] || '/';
                    this.access_token = this.route.snapshot.queryParams['access-token'] || '/';
                    this.firstName = this.route.snapshot.queryParams['firstName'] || '/';
                    this.username = this.route.snapshot.queryParams['firstName'] || '/';
                    this.lastName = this.route.snapshot.queryParams['lastName'] || '/';
                    this.email = this.route.snapshot.queryParams['email'] || '/';
                    this.picture = this.route.snapshot.queryParams['picture'] || '/';
                    this.description = this.route.snapshot.queryParams['industry'] || '/';
                    this.type = type;
                    this.linkedinCreateCartLogin(this.type);
                } else {
                    $('#linkedinRegisterModal').modal('toggle');
                    // var type = this.route.snapshot.queryParams['type'] || '/';
                    this.type = res.type;
                    this.id = this.route.snapshot.queryParams['id'] || '/';
                    this.access_token = this.route.snapshot.queryParams['access-token'] || '/';
                    this.firstName = this.route.snapshot.queryParams['firstName'] || '/';
                    this.username = this.route.snapshot.queryParams['firstName'] || '/';
                    this.lastName = this.route.snapshot.queryParams['lastName'] || '/';
                    // this.email = 'adriantobon@live.com';
                    this.email = this.route.snapshot.queryParams['email'] || '/';
                    this.picture = this.route.snapshot.queryParams['picture'] || '/';
                    this.description = this.route.snapshot.queryParams['industry'] || '/';
                    this.authenticationService.setUserLinkedin(this.username, this.firstName, this.lastName, this.email, this.picture, this.description, this.access_token, this.type, this.id);
                }
            });
        }
    }

    ngAfterViewInit() {
        
    }

    createUserTypeForm() {
        this.userTypeForm = this.fb.group({
            userType: [null, Validators.required]
        });
    }

    linkedinRegister(value) {
        console.log('value', value);
        this.type = value.userType;
        this.linkedinCreateCartRegister(this.type);
    }

    linkedinCreateCartRegister(type?) {
        console.log('type', type);
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;
        this.cart_id = '';
        console.log('thiscartid', this.cart_id);

        if (this.cart_id === '' || this.cart_id == null) {
            this._cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.authenticationService.setUserLinkedin(this.username, this.firstName, this.lastName, this.email, this.picture, this.description, this.access_token, this.type, this.id);
                this.cart_id = cart.id;
                this._cartService.setCart(this.currentUser, cart.id);
                this._cartService.cartLoaded.emit(true);
                // send the type of the login to app component

                console.log('Pruebas', this.email, type);
                if (!this.email) {
                    this.email = this.currentUser.email;
                    console.log('eeemail', this.email);
                }
                this.authenticationService.socialTypeOfUser(this.id, type).subscribe(res => {
                    console.log('res assigntype', res);
                    // localStorage.removeItem('currentUser');
                });
                this.authenticationService.getType.emit(type);
                this.authenticationService.typeOfUser = type;
                console.log('auth type', this.authenticationService.typeOfUser);


                console.log('redirect', type);
                if (type !== 'candidate') {
                    $('#linkedinRegisterModal').modal('hide');
                    this.authenticationService.getLoggedIn.emit(true);
                    setTimeout(() => {
                        console.log('aqui esta el time');
                        window.location.href = '/#/register/recruiter';
                    }, 1000);
                } else {
                    $('#linkedinRegisterModal').modal('hide');
                    this.authenticationService.getLoggedIn.emit(true);
                    setTimeout(() => {
                        console.log('aqui esta el time');
                        window.location.href = '/#/register/candidate';
                    }, 1000);
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    linkedinCreateCartLogin(type?) {
        console.log('aqui type', type);
        this.authenticationService.setUserLinkedin(this.username, this.firstName, this.lastName, this.email, this.picture, this.description, this.access_token, this.type, this.id);
        this.currentUser = this.authenticationService.getUser();
        this.cart_id = this.currentUser.cart_id;
        this.cart_id = '';


        if (this.cart_id === '' || this.cart_id == null) {
            this._cartService.createCart().subscribe(cart => {

                this.loading = false;
                this.cart_id = cart.id;
                this._cartService.setCart(this.currentUser, cart.id);
                this._cartService.cartLoaded.emit(true);
                this.authenticationService.getType.emit(type);

                if (type !== 'candidate') {
                    $('#linkedinRegisterModal').modal('hide');
                    setTimeout(() => {
                        this.authenticationService.getLoggedIn.emit(true);
                        window.location.href = '/#/profiles';
                    }, 1000);
                } else {
                    $('#linkedinRegisterModal').modal('hide');
                    setTimeout(() => {
                        this.authenticationService.getLoggedIn.emit(true);
                        window.location.href = '/#/vacancies-candidate';
                    }, 1000);
                }
            },
                error => {
                    this.loading = false;
                });
        } else {
            return this.cart_id;
        }
    }

    closeLinkedinTypeModal() {
        $('#linkedinRegisterModal').modal('hide');
    }


}
