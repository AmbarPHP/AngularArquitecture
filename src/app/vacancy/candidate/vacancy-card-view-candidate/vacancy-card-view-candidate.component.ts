import { Component, Input } from '@angular/core';

@Component({
    selector: 'vacancy-card-view-candidate',
    templateUrl: 'vacancy-card-view-candidate.component.html',
    styleUrls: ['vacancy-card-view-candidate.scss']
})

export class VacancyCardViewCandidateComponent {

    @Input()
    pagedItems: any;
}