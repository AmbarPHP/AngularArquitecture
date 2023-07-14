import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-top-filters-candidate',
    templateUrl: 'vacancy-top-filters-candidate.component.html',
    styleUrls: ['vacancy-top-filters-candidate.scss']
})

export class VacancyTopFiltersCandidateComponent {
    
    @Input()
    searchByTitle: any;

    @Output()
    sendSearchByTitleEvent: EventEmitter<any> = new EventEmitter<any>();

    getSearchByTitle(event) {
        this.searchByTitle = event;
        this.sendSearchByTitleEvent.emit(this.searchByTitle);
    }
}