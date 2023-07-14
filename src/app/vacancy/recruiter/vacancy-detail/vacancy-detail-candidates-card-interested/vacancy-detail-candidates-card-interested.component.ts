import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-candidates-card-interested',
    templateUrl: 'vacancy-detail-candidates-card-interested.component.html',
    styleUrls: ['vacancy-detail-candidates-card-interested.scss']
})

export class VacancyDetailCandidatesCardInterestedComponent {

    skypeContact: string;
    facebookContact: string;
    githubContact: string;
    linkedinContact: string;
    twitterContact: string;

    // Adding this property in order to avoid error in prod build
    t: any;

    @Input()
    selectedProfiles: any;

    @Input()
    applicant: any;

    @Input()
    interestedProfilesSelected: any;

    @Input()
    vacancy: any;

    @Input()
    userType: any;

    @Output()
    sendBuyProfileEvent: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    sendInterestedProfilesSelectedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendInterestedProfilesUncheckedEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDeselectAllInterestedEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendDeleteApplicantsInterestedEvent: EventEmitter<any> = new EventEmitter();

    ngAfterViewInit() {
        this.previewProfile();
    }    

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

    deselectAllMobile() {
        this.interestedProfilesSelected = [];
        this.sendDeselectAllInterestedEvent.emit(this.interestedProfilesSelected)
    }

    removeApplicantInterestedFromVacancy(vacancy, interestedProfilesSelected){
        let applicantInformation = {
            vacancy: vacancy[0].id,
            interestedProfilesSelected: interestedProfilesSelected
        }

        this.sendDeleteApplicantsInterestedEvent.emit(applicantInformation);
    }

    getOuterStrokeColor() {
        if(this.applicant.match >= 75) {
            return '#a0c0ff';
        }

        if(this.applicant.match >= 60 && this.applicant.match <= 74) {
            return '#f49c00';
        }

        if(this.applicant.match <= 59) {
            return '#e01401';
        }
    }

    getInnerStrokeColor() {
        if(this.applicant.match >= 75) {
            return '#99ccff';
        }

        if(this.applicant.match >= 60 && this.applicant.match <= 74) {
            return '#e5c82d';
        }

        if(this.applicant.match <= 59) {
            return '#ff4e19';
        }

    }

    previewProfile() {
        $(".preview-icon").popover({
            placement: 'auto',
            template: '<div class="popover" role="tooltip" style="width="500px"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            html: true,
            content: `
                    <div>
                        <p>Position:</p>
                        <p>${this.applicant.pd_position}</p>
                    </div>
                    <div>
                        <p>Skills:</p>
                        <p>
                            ${this.getSkills()}
                        </p>
                    </div>
                    <div>
                        <p>Work Experience:</p>
                        <p>${this.getDetails()}</p>
                    </div>
                    `,
            trigger: 'hover focus',
            title: 'Profile Preview',
        })
    }

    getSkills() {
        let skills = [];
        for(let i = 0; i < this.applicant.skills.length; i++) {
            skills.push(`<span class="badge">${this.applicant.skills[i]}</span>`)
        }
        return skills;
    }

    getDetails() {
        if(this.applicant.details.length > 0) {
            return this.applicant.details[0].pd_responsabilities;
        }
    }

}