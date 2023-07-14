import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-account-recruiter-header',
    templateUrl: 'my-account-recruiter-header.component.html',
    styleUrls: ['my-account-recruiter-header.scss']
})

export class MyAccountRecruiterHeaderComponent {

    options: {
        information: true,
        preferences: false
    }

    prueba = true;
    prueba2 = false;

    @Input()
    myAccountRecruiterState: any;

    @Input()
    membershipState: boolean;

    @Output()
    changeMyAccountRecruiterStateEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    changeMembershipStateEvent: EventEmitter<any> = new EventEmitter();

    changeRecruiterState(state) {
        this.changeMyAccountRecruiterStateEvent.emit(state);
    }

    // onChange(event) {
    //     event === "0" ? this.isRecruiterInformation = true : this.isRecruiterInformation = false;
    //     this.isRecruiterInformationEvent.emit(this.isRecruiterInformation);
    // }

    memebershipState() {
        this.changeMembershipStateEvent.emit();
    }
}