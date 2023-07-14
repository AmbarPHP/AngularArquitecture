import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'my-account-recruiter-preferences',
    templateUrl: 'my-account-recruiter-preferences.component.html',
    styleUrls: ['my-account-recruiter-preferences.scss']
})

export class MyAccountRecruiterPreferencesComponent implements OnInit {

    constructor(private fb: FormBuilder) {}

    changePasswordForm: FormGroup;
    noMatchPasswordError: boolean = false;

    @Output()
    sendChangePasswordEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    changePasswordError: any;

    @Input()
    changePasswordSuccess: any;

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
        this.sendChangePasswordEvent.emit(this.changePasswordForm.value);
        this.changePasswordForm.reset();
    }
}