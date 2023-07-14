import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-applications-card-view',
    templateUrl: 'my-applications-card-view.component.html',
    styleUrls: ['my-applications-card-view.scss']
})

export class MyApplicationsCardViewComponent {

    filter: any;

    @Input()
    applications: any;

    @Input()
    notInterested: any;

    @Input()
    term: string;

    @Output()
    sendNotInterestedEvent: EventEmitter<any> = new EventEmitter<any>()

    @Output()
    sendClearTermEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendEmail: EventEmitter<any> = new EventEmitter<any>();


    notInterestedFunction(checked: boolean, id: number) {
        if(checked) {
            this.notInterested.push(id);
            this.sendNotInterestedEvent.emit(this.notInterested);
        } else {
            this.notInterested = this.notInterested.filter(res => {
                return res != id;
            })
            this.sendNotInterestedEvent.emit(this.notInterested);
        }
    }

    sendEmailFunction(applicationId){
        this.sendEmail.emit(applicationId);
    }

    getCheckBoxesChecked(applicationId) {
        for(let i = 0; i < this.notInterested.length; i++) {
            if(this.notInterested[i] === applicationId) {
                return true
            }
        }
        return false;
    }

    clearTerm() {
        this.term = "";
        this.sendClearTermEvent.emit(this.term);
    }
}