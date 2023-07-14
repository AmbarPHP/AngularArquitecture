import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-header-candidate',
    templateUrl: 'vacancy-header-candidate.component.html',
    styleUrls: ['vacancy-header-candidate.scss']
})

export class VacancyHeaderCandidateComponent {

    @Input()
    vacancyListView: boolean;

    @Output()
    sendVacancyListViewEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    listViewtoggle() {
        this.vacancyListView = !this.vacancyListView;
        this.sendVacancyListViewEvent.emit(this.vacancyListView);
    }
}