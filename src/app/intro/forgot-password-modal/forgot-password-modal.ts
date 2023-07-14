import { Subscriber } from './../../_models/subscriber';
import { ForgotPasswordService } from './../../_services/forgot-password.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'forgot-password-modal',
    templateUrl: 'forgot-password-modal.html',
    styleUrls: ['forgot-password-modal.scss']
})

export class ForgotPasswordModalComponent {
    subscriberModel = new Subscriber(null)
    constructor(private forgotPasswordService: ForgotPasswordService) {

    }

    send(email) {
        this.forgotPasswordService.create(email).subscribe((response: Response) => {
        },
        (error: any) => {
        });

    }

}