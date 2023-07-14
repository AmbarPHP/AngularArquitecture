import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VacancyService } from '../../../../_services/vacancy.service';


@Component({
    selector: 'vacancy-detail-candidate-view-card',
    templateUrl: 'vacancy-detail-candidate-view-card.component.html',
    styleUrls: ['vacancy-detail-candidate-view-card.scss']
})

export class VacancyDetailCandidateViewCardComponent {

    @Input()
    vacancy: any;

    @Input()
    isApplicant: any;

    @Output()
    sendApplyForJobEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendNotInterestedEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        console.log("vacancy", this.vacancy);
    }

    applyForJob(id: number) {
        this.sendApplyForJobEvent.emit(id);
    }

    notInterested(id: number) {
        this.sendNotInterestedEvent.emit(id);
    }

}