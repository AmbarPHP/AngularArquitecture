import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../_services/profile.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
    selector: 'signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})

export class SignupComponent {

    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private _profileService: ProfileService,
                private _userService: UserService,
                private _authenticationService: AuthenticationService,
                private router: Router) {}

    params: any;
    signupForm: FormGroup;
    signupError: boolean = false;
    signupErrorMessage: string;

    profileData: any;

    ngOnInit() {
        this.userComingFromEmail();
    }

    createForm() {
        this.signupForm = this.fb.group({
            username: [this.params.email || 'teee', Validators.email],
            password: ['', Validators.required],
            type: ['candidate']
        })
    }

    userComingFromEmail() {
        this.route.queryParams.subscribe(res => {
            if(res.profile) {
                this.params = res;
                this.getProfileData();
                this.createForm();

            } else {
                this.params = "no hay parametros"
                this.createForm();
            }
        })
    }

    getProfileData() {
        this._profileService.getById(this.params.profile).subscribe(res => {
            this.profileData = res;
            this._userService.candidateFromEmailData = res;
        })
    }

    signup(signupForm) {
        this.signupError = false;
        console.log("test", signupForm)
        this._userService.create(signupForm).subscribe(res => {
            console.log("user service res", res)
            this.loginRegister(signupForm)
        }, err => {
            let error = JSON.parse(err._body);
            console.log("signuperror", error.username[0])
            this.signupError = true;
            this.signupErrorMessage = error.username[0];
        })
    }

    loginRegister(signupForm) {
        // this.loading = true;
        this._authenticationService.login(signupForm.username, signupForm.password, false)
            .subscribe(
            data => {
                this._authenticationService.me().subscribe(data => {
                    let user = this._authenticationService.getUser();
                    user.id = data.obfuscated_id;
                    user.email = data.email;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.router.navigate(['register/candidate']);
                });

            },
            error => {
                console.log("error", error)
            });
    }

}