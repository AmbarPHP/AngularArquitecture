import { User } from './../../../_models/user';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VacancyService } from "../../../_services/vacancy.service";
import { ActivatedRoute } from "@angular/router";
import { Message } from "primeng/primeng";
import { AlertService, AuthenticationService, CartService } from "../../../_services/index";
import { Router } from "@angular/router";

@Component({
    selector: 'vacancy-header',
    templateUrl: './vacancy-header.component.html',
    styleUrls: ['vacancy-header.scss']
})

export class VacancyHeaderComponent {
    currentUser: User;
    type: any;
    vacancyListView: boolean = false;

    vacancyListViewToogle() {
        this.vacancyListView = !this.vacancyListView;
        this.eventvacancyListView.emit(this.vacancyListView);
    }

    constructor(private authenticationService: AuthenticationService) { }
    

    @Input()
    cardsSelected: any;

    @Output()
    eventDeselectAll: EventEmitter<any> = new EventEmitter();

    @Output()
    eventvacancyListView: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSuccessSubmitEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendDeleteVacanciesEvent: EventEmitter<any> = new EventEmitter();


    ngOnInit(){
        this.currentUser = this.authenticationService.getUser();
        if (!(this.currentUser)){
            this.currentUser = new User();
        }
    }

    deselectAll() {
        this.cardsSelected = [];
        this.eventDeselectAll.emit(this.cardsSelected)
    }

    getSendSuccessSubmit(event) {
        this.sendSuccessSubmitEvent.emit(event);
    }

    getDeleteVacancies(event) {
        this.sendDeleteVacanciesEvent.emit("nothing to send");
    }
}