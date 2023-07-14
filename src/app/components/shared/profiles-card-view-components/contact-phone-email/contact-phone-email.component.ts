import { Component, Input } from '@angular/core';

@Component({
    selector: 'contact-phone-email',
    templateUrl: 'contact-phone-email.component.html',
    styleUrls: ['contact-phone-email.component.scss']
})

export class ContactPhoneEmailComponent {

    @Input()
    profile: any;

}