import { Component } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'login-module',
    templateUrl: 'login-module.component.html',
    styleUrls: ['login-module.scss']
})

export class LoginModuleComponent {

    form: FormGroup;
    error = false;

    constructor(private _authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private router: Router) {}

    ngOnInit() {
        this.createForm();
    };

    submit(value) {
        console.log('value', value);
        this._authenticationService.login(value.username, value.password).subscribe(res => {
            console.log('res', res);
            this._authenticationService.me().subscribe(data => {
                console.log('data', data);
                this.router.navigate(['vacancies-candidate']);
            }, error => {
                this.error = true;
                console.log(error);
            });
        }, err => {
            this.error = true;
            console.log(err);
        });
    }

    createForm() {
        this.form = this.fb.group({
            username: [''],
            password: ['']
        });
    }
}
