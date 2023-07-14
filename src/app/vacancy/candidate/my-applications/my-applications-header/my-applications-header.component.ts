import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-applications-header',
    templateUrl: 'my-applications-header.component.html',
    styleUrls: ['my-applications-header.scss']
})

export class MyApplicationsHeaderComponent {
    @Input()
    applications: any;

    @Input()
    notInterested: any

    @Output()
    deselectAllApplicationsEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    removeApplicantsEvent: EventEmitter<any> = new EventEmitter<any>();

    deselectAllApplications() {
        this.notInterested = []
        this.deselectAllApplicationsEvent.emit(this.notInterested);
    }

    removeApplicants() {
        this.removeApplicantsEvent.emit(this.notInterested);
    }
}