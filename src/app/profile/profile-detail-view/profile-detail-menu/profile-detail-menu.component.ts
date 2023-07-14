import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'profile-detail-menu',
    templateUrl: 'profile-detail-menu.component.html',
    styleUrls: ['profile-detail-menu.scss']
})

export class ProfileDetailMenuComponent {

    @Input()
    contactInfo: boolean

    @Output()
    sendContactInfoEvent: EventEmitter<any> = new EventEmitter()

    contactInfoToggle() {
        this.contactInfo = !this.contactInfo;
        this.sendContactInfoEvent.emit(this.contactInfo);
    }

}