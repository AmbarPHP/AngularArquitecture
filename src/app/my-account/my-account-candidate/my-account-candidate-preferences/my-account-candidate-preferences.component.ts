import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../../_services/user.service';

@Component({
    selector: 'my-account-candidate-preferences',
    templateUrl: 'my-account-candidate-preferences.component.html',
    styleUrls: ['my-account-candidate-preferences.scss']
})

export class MyAccountCandidatePreferencesComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private _userService: UserService) {}

    changePasswordForm: FormGroup;   
    noMatchPasswordError: boolean = false; 
    changePasswordSuccess: boolean = false;
    changePasswordError: boolean = false;

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.changePasswordForm = this.fb.group({
            old_password: ['', Validators.required],
            new_password: ['', Validators.required],
            confirm_password: ['', Validators.required]
        });
    }

    changePassword() {
        if(this.changePasswordForm.value.new_password != this.changePasswordForm.value.confirm_password) {
            this.noMatchPasswordError = true;
            setTimeout(() => {
                this.noMatchPasswordError = false;
            }, 3000);
            return;
        }
        this._userService.changePassword(this.changePasswordForm.value.old_password, this.changePasswordForm.value.new_password).subscribe(res => {
            this.changePasswordSuccess = true;
            this.changePasswordForm.reset();
            setTimeout(() => {
                this.changePasswordSuccess = false;
            }, 3000);
        }, err => {
            console.log("Error Change password", err);
            this.changePasswordError = true;
            setTimeout(() => {
                this.changePasswordError = false;
            }, 3000);
        });
    }
}