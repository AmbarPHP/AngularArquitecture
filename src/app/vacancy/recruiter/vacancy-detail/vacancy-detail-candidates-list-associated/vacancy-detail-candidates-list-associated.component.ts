import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidates-list-associated',
    templateUrl: 'vacancy-detail-candidates-list-associated.component.html',
    styleUrls: ['vacancy-detail-candidates-list-associated.scss']
})

export class VacancyDetailCandidatesListAssociatedComponent {

    skypeContact: string;
    facebookContact: string;
    githubContact: string;
    linkedinContact: string;
    twitterContact: string;

    @Input()
    applicant: any;

    @Input()
    userType: any;    

    @Input()
    vacancy: any;

    @Input()
    contactInformation: any;

    @Input()
    associatedProfilesSelected: any;

    @Output()
    sendBuyProfileEvent: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    sendAssociatedProfilesSelected: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendAssociatedProfilesUnchecked: EventEmitter<any> = new EventEmitter<any>();

    buyProfile(id: number) {
        this.sendBuyProfileEvent.emit(id);
        console.log(id)
    }

    checkProfile(id: number) {
        this.sendAssociatedProfilesSelected.emit(id);
    }

    uncheckProfile(id: number) {
        this.sendAssociatedProfilesUnchecked.emit(id);
    }

    getCheckBoxesSaved(id: number) {
        for(let i = 0; i < this.associatedProfilesSelected.length; i++) {
            if(this.associatedProfilesSelected[i] === id) {
                return true
            }
        }
        return false;
    }

    get socialSkype() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "skype") {
                    this.skypeContact = this.applicant.contact_information[i].pd_contact;
                    return true;
                }
            }
        } else {
            return false
        }
    }

    get socialLinkedin() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "linkedin") {
                    this.linkedinContact = this.applicant.contact_information[i].pd_contact;
                    return true;
                }
            }
        } else {
            return false
        }
    }

    get socialGithub() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "github") {
                    this.githubContact = this.applicant.contact_information[i].pd_contact;
                    return true;
                }
            }
        } else {
            return false
        }
    }

    get socialFacebook() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "facebook") {
                    this.facebookContact = this.applicant.contact_information[i].pd_contact;
                    return true;
                }
            }
        } else {
            return false
        }
    }

    get socialTwitter() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "twitter") {
                    this.twitterContact = this.applicant.contact_information[i].pd_contact;
                    return true;
                }
            }
        } else {
            return false
        }
    }
}