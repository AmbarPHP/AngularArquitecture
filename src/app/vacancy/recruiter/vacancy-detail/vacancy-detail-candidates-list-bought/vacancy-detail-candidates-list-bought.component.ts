import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidates-list-bought',
    templateUrl: 'vacancy-detail-candidates-list-bought.component.html',
    styleUrls: ['vacancy-detail-candidates-list-bought.scss']
})

export class VacancyDetailCandidatesListBoughtComponent {

    skypeContact: string;
    facebookContact: string;
    githubContact: string;
    linkedinContact: string;
    twitterContact: string;

    @Input()
    applicant: any;

    @Input()
    boughtProfilesSelected: any;

    @Output()
    sendBoughtProfilesSelected: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    sendBoughtProfilesUnchecked: EventEmitter<any> = new EventEmitter<any>();

    checkProfile(id: number) {
        this.sendBoughtProfilesSelected.emit(id);
    }

    uncheckProfile(id: number) {
        this.sendBoughtProfilesUnchecked.emit(id);
    }

    getCheckBoxesSaved(id: number) {
        for(let i = 0; i < this.boughtProfilesSelected.length; i++) {
            if(this.boughtProfilesSelected[i] === id) {
                return true
            }
        }
        return false;
    }

    get socialSkype() {
        if(this.applicant.contact_information.length > 0) {
            for(let i = 0; i < this.applicant.contact_information.length; i++) {
                if(this.applicant.contact_information[i].pd_social_net === "skype") {
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
                    return true;
                }
            }
        } else {
            return false
        }
    }
}