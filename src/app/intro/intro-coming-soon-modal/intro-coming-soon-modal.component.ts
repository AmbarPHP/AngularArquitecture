import { SubscriberService } from '../../_services/subscriber.service';

import { Component } from '@angular/core';
declare const swal: any;

@Component({
    moduleId: module.id.toString(),
    selector: 'coming-soon-modal',
    templateUrl: 'intro-coming-soon-modal.component.html',
    styleUrls: ['intro-coming-soon-modal.component.scss']
})
export class IntroComingSoonModalComponent {
    form: any;
    email: any;

    constructor(private subscriberService: SubscriberService) { }


    getEmail(form) {
        this.form = form.email;
    }

    subscribe() {
        this.subscriberService.create(this.form).subscribe(() => {
            swal("Thank you!", "We'll notify you shortly.", "success");


        },
            error => {

            });
    }

}
