import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-account-candidate-header',
    templateUrl: 'my-account-candidate-header.component.html',
    styleUrls: ['my-account-candidate-header.scss']
})

export class MyAccountCandidateHeaderComponent {

    @Input()
    candidateMenuSelected: string;

    @Output()
    sendCandidateMenuSelectedEvent: EventEmitter<any> = new EventEmitter();

    clickMenu(menu) {
        this.candidateMenuSelected = menu;
        this.sendCandidateMenuSelectedEvent.emit(this.candidateMenuSelected);
    }
}