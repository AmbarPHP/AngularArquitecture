import { Component, Input } from '@angular/core';

@Component({
    selector: 'vacancy-list-view-candidate',
    templateUrl: 'vacancy-list-view-candidate.component.html',
    styleUrls: ['vacancy-list-view-candidate.scss']
})

export class VacancyListViewCandidateComponent {

    @Input()
    pagedItems: any;

    ngOnInit() {
        console.log('paged', this.pagedItems);
    }
}