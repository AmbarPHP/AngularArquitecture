import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-applications-main-filter',
    templateUrl: 'my-applications-main-filter.component.html',
    styleUrls: ['my-applications-main-filter.scss']
})

export class MyApplicationsMainFilterComponent {
    @Input()
    term: string;

    @Output()
    sendTermEvent: EventEmitter<any> = new EventEmitter<any>();

    valueChange(event) {
        this.term = event;     
    }

    searchVacancy() {
        this.sendTermEvent.emit(this.term);
    } 
}