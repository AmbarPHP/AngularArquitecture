import { Component, Input } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidate-details',
    templateUrl: 'vacancy-detail-candidate-details.component.html',
    styleUrls: ['vacancy-detail-candidate-details.scss']
})

export class VacancyDetailCandidateDetailsComponent {

    @Input()
    vacancy: any;
}