import { Component, Input, Output, EventEmitter  } from '@angular/core';

@Component({
    selector: 'talent-detail-menu',
    templateUrl: 'talent-detail-menu.component.html',
    styleUrls: ['talent-detail-menu.scss']
})

export class TalentDetailMenuComponent {

    @Input()
    contactInfo: boolean

    @Output()
    sendContactInfoEvent: EventEmitter<any> = new EventEmitter()

    contactInfoToggle() {
        this.contactInfo = !this.contactInfo;
        this.sendContactInfoEvent.emit(this.contactInfo);
    }
}