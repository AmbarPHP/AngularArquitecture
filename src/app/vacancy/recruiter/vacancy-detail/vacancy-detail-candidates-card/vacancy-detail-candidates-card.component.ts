import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidates-card',
    templateUrl: 'vacancy-detail-candidates-card.component.html',
    styleUrls: ['vacancy-detail-candidates-card.scss']
})

export class VacancyDetailCandidatesCardComponent {

    @Input()
    applicant: any;

    @Input()
    selectedProfiles: any;

    selectProfile(applicant) {
        this.selectedProfiles.push(applicant)
    }


}