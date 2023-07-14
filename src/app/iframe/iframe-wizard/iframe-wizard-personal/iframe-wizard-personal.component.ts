import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../_services/location.service';
import { UserService } from '../../../_services/user.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { CartService } from '../../../_services/cart.service';
import { CandidateConctactInfoService } from '../../../_services/candidate/contact-info';
import { CandidatePersonalInfoService } from '../../../_services/candidate/personal-info';
import { IframeService } from '../../../_services/iframe.service';
import { concat } from 'rxjs/operator/concat';

@Component({
    selector: 'iframe-wizard-personal',
    templateUrl: 'iframe-wizard-personal.component.html',
    styleUrls: ['iframe-wizard-personal.scss']
})

export class IframeWizardPersonalComponent {

    constructor(private fb: FormBuilder,
                private _locationService: LocationService,
                private  _userService: UserService,
                private _authentificationService: AuthenticationService,
                private _cartService: CartService,
                private _personalInformationService: CandidatePersonalInfoService,
                private _contactInformationService: CandidateConctactInfoService,
                private _iframeService: IframeService) {}

    form: FormGroup;
    // countries: any;
    states: any;
    cities: any;
    currentUser: any;
    cart_id: any;
    emailHasSuccess: boolean;
    loading: boolean = false;


    @Output()
    sendPersonalInformationEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendWizardStepEvent: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        this.createForm();
        this.emailHasSuccess = this._iframeService.emailHasSuccess;
        // this._locationService.getAllCountries().subscribe(res => {
        //     this.countries = res;
        //     console.log('countries', this.countries);
        // })
        if(this._iframeService.email != '') {
            this._iframeService.emailHasSuccess = true;
            this.emailHasSuccess = this._iframeService.emailHasSuccess;
            this._personalInformationService.get().subscribe(res => {
                console.log("info", res);
                this.form.controls['first_name'].setValue(res.first_name);
                this.form.controls['last_name'].setValue(res.last_name);
                // this.form.controls['country'].setValue(res.country);
                this.form.controls['title'].setValue(res.title);
            },
            err => {
                console.log(err);
            })
            this._contactInformationService.get().subscribe(res => {
                this.form.controls['phone'].setValue(res.phone);
            },
            err => {
                console.log(err);
            })
        }
    }

    createForm() {
        this.form = this.fb.group({
            email: [this._iframeService.email, Validators.email],
            phone: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            // country: ['', Validators.required],
            title: ['', Validators.required]
        })
    }

    nextPage() {
        this._personalInformationService.post(this.form.value).subscribe(res => {
            console.log("Aqui", res)
            this.wizardStep();
            this._iframeService.email = this.form.controls['email'].value;
        },
        err => {
            console.log(err)
        });
        let contactInformation = {
            email: this.form.controls['email'].value,
            phone: this.form.controls['phone'].value,
            facebook_url: '',
            github_url: '',
            linkedin_url: '',
            skype_url: ''
        }
        this._contactInformationService.post(contactInformation).subscribe(res => {
            console.log("Aqui2", res)
        },
        err => {
            console.log(err);
        })
    }

    wizardStep() {
        this.sendWizardStepEvent.emit(2);
    }

    register() {
        let user = {
            id: '',
            type: 'candidate',
            username: this.form.controls['email'].value,
            password: '123456',
            phone: "",
            email: "",
            firstName: "",
            description: "",
            lastName: "",
            picture: "",
            token: "",
            social_id: "",
            social_token: "",
            cart_id: "",
        }
        if(this._authentificationService.isLoggedIn()) {
            this._authentificationService.logout();
            this.emailHasSuccess = false;
        }
        this._userService.create(user)
            .subscribe(
            data => {
                this.login();
            },
            error => {
                console.log(error);
                // console.log(JSON.parse(error._body).username[0])
                if(JSON.parse(error._body).username[0] === `Usuario con correo ${this.form.controls['email'].value} ya existente`) {
                    console.log("Error correcto")
                    this._iframeService.emailHasSuccess = true;
                    this.emailHasSuccess = this._iframeService.emailHasSuccess;
                    if(this._authentificationService.isLoggedIn()) {
                        this._authentificationService.logout();
                    }
                    this.loginWhenUserAlreadyExists();
                } else {
                    this._iframeService.emailHasSuccess = false;
                    this.emailHasSuccess = this._iframeService.emailHasSuccess;
                    this.form.controls['first_name'].setValue('');
                    this.form.controls['last_name'].setValue('');
                    // this.form.controls['country'].setValue('');
                    this.form.controls['title'].setValue('');
                    this.form.controls['phone'].setValue('');
                }
            });
    }

    login() {
        this._authentificationService.login(this.form.controls['email'].value, "123456")
            .subscribe(
            data => {
                this._authentificationService.me().subscribe(data => {
                    let user = this._authentificationService.getUser();
                    user.id = data.id;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.createCart();
                });

            },
            error => {
                console.log(error);
            });
    }

    loginWhenUserAlreadyExists() {
        this.loading = true;
        this._authentificationService.login(this.form.controls['email'].value, "123456")
            .subscribe(
            data => {
                this._authentificationService.me().subscribe(data => {
                    let user = this._authentificationService.getUser();
                    user.id = data.id;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.createCart();
                    this._personalInformationService.get().subscribe(res => {
                        console.log("info", res);
                        this.form.controls['first_name'].setValue(res.first_name);
                        this.form.controls['last_name'].setValue(res.last_name);
                        // this.form.controls['country'].setValue(res.country);
                        this.form.controls['title'].setValue(res.title);
                        this.loading = false;
                    },
                    err => {
                        console.log(err);
                        this.loading = false;
                    })
                    this._contactInformationService.get().subscribe(res => {
                        this.form.controls['phone'].setValue(res.phone);
                    },
                    err => {
                        console.log(err);
                        this.loading = false;
                    })
                });

            },
            error => {
                console.log(error);
                this.loading = false;
            });
    }

    createCart() {

        this.currentUser = this._authentificationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id == "" || this.cart_id == null) {
            this._cartService.createCart().subscribe(cart => {
                this.cart_id = cart.id;
                this._cartService.setCart(this.currentUser, cart.id);
                this._cartService.cartLoaded.emit(true);
             
            },
                error => {
                    console.log(error);
                });
        } else {
            return this.cart_id;
        }
    }

    get emailHasError() {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
    }

    get phoneHasError() {
        const control = this.form.get('phone');
        return control.hasError('required') && control.touched;
    }

    get firstnameHasError() {
        const control = this.form.get('first_name');
        return control.hasError('required') && control.touched;
    }

    get lastnameHasError() {
        const control = this.form.get('last_name');
        return control.hasError('required') && control.touched;
    }

    // get countryHasError() {
    //     const control = this.form.get('country');
    //     return control.hasError('required') && control.touched;
    // }

    get titleHasError() {
        const control = this.form.get('title');
        return control.hasError('required') && control.touched;
    }
}