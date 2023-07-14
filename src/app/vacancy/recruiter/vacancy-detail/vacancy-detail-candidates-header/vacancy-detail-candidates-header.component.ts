import { User } from './../../../../_models/user';
import { AuthenticationService } from './../../../../_services/authentication.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'vacancy-detail-candidates-header',
    templateUrl: 'vacancy-detail-candidates-header.component.html',
    styleUrls: ['vacancy-detail-candidates-header.scss']
})

export class VacancyDetailCandidatesHeaderComponent {
    msgs: any[];
    @Input()
    selectedProfiles: any;

    @Input()
    vacancy: any;

    @Input()
    optionSelected: any;

    @Input()
    interestedProfilesSelected: any;

    @Input()
    boughtProfilesSelected: any;

    @Input()
    associatedProfilesSelected: any;

    @Input()
    userType: any;

    @Input()
    listView: any;

    @Output()
    sendBoughtEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    sendOptionSelectedEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendDeselectAllInterestedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeselectAllBoughtEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeselectAllAssociatedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeleteApplicantsInterestedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeleteApplicantsBoughtEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeleteApplicantsAssociatedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendChangeViewEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private router: Router, private authenticationService: AuthenticationService) { }
    
    ngOnInit() {
        console.log("vacancy", this.vacancy)
    }

    removeApplicantInterestedFromVacancy(vacancy, interestedProfilesSelected){
        let applicantInformation = {
            vacancy: vacancy[0].id,
            interestedProfilesSelected: interestedProfilesSelected
        }

        this.sendDeleteApplicantsInterestedEvent.emit(applicantInformation);
    }

    removeApplicantBoughtFromVacancy(vacancy, boughtProfilesSelected){
        let applicantInformation = {
            vacancy: vacancy[0].id,
            boughtProfilesSelected: boughtProfilesSelected
        }

        this.sendDeleteApplicantsBoughtEvent.emit(applicantInformation);
    }

    removeApplicantAssociatedFromVacancy(vacancy, associatedProfilesSelected){
        let applicantInformation = {
            vacancy: vacancy[0].id,
            associatedProfilesSelected: associatedProfilesSelected
        }

        this.sendDeleteApplicantsAssociatedEvent.emit(applicantInformation);
    }

    changeOption(optionSelected: string) {
        console.log("option selected", optionSelected)
        if(this.optionSelected !== optionSelected) {
            this.deselectAllBought();
            this.deselectAllInterested();
            this.deselectAllAssociated();
            this.sendOptionSelectedEvent.emit(optionSelected);
        }


    }

    deselectAllInterested() {
        this.interestedProfilesSelected = [];
        this.sendDeselectAllInterestedEvent.emit(this.interestedProfilesSelected);
    }

    deselectAllBought() {
        this.boughtProfilesSelected = [];
        this.sendDeselectAllBoughtEvent.emit(this.boughtProfilesSelected);
    }

    deselectAllAssociated() {
        this.associatedProfilesSelected = [];
        this.sendDeselectAllAssociatedEvent.emit(this.associatedProfilesSelected);
    }

    changeView() {
        this.listView = !this.listView;
        this.sendChangeViewEvent.emit(this.listView);
    }

}