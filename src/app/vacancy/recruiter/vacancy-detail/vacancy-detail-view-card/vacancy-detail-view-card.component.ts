import { User } from './../../../../_models/user';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { VacancyService } from './../../../../_services/vacancy.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-view-card',
    templateUrl: 'vacancy-detail-view-card.component.html',
    styleUrls: ['vacancy-detail-view-card.scss']
})

export class VacancyDetailViewCardComponent {
    msgs: any[];
    currentUser: any;

    constructor(private authenticationService: AuthenticationService) { }



    @Input()
    vacancy: any;

    @Output()
    sendDeleteVacancyEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendEditVacancyEvent: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        console.log(this.vacancy);
        this.currentUser = this.authenticationService.getUser();
        if (!(this.currentUser)){
            this.currentUser = new User();
        }
    }

    vacancyDelete(vacancy) {
        console.log(vacancy.id);
        this.sendDeleteVacancyEvent.emit(vacancy.id);
    }

    vacancyEdit(vacancy) {
        console.log(vacancy.id);
        this.sendEditVacancyEvent.emit(vacancy.id);
    }

}