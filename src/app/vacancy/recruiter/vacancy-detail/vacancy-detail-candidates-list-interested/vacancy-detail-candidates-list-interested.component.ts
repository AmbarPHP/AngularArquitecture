import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidates-list-interested',
    templateUrl: 'vacancy-detail-candidates-list-interested.component.html',
    styleUrls: ['vacancy-detail-candidates-list-interested.scss']
})

export class VacancyDetailCandidatesListInterestedComponent {

    skypeContact: string;
    facebookContact: string;
    githubContact: string;
    linkedinContact: string;
    twitterContact: string;

    @Input()
    applicant: any;

    @Input()
    interestedProfilesSelected: any;

    @Output()
    sendBuyProfileEvent: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    sendInterestedProfilesSelectedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendInterestedProfilesUncheckedEvent: EventEmitter<any> = new EventEmitter<any>();

    buyProfile(id: number) {
        this.sendBuyProfileEvent.emit(id);
        console.log(id)
    }

    checkProfile(id: number) {
        this.sendInterestedProfilesSelectedEvent.emit(id);
    }

    uncheckProfile(id: number) {
        this.sendInterestedProfilesUncheckedEvent.emit(id);
    }

    getCheckBoxesSaved(id: number) {
        for(let i = 0; i < this.interestedProfilesSelected.length; i++) {
            if(this.interestedProfilesSelected[i] === id) {
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