import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'profile-card-view',
    templateUrl: 'profile-card-view.component.html',
    styleUrls: ['profile-card-view.scss']
})

export class ProfileCardViewComponent {

    constructor(private router: Router) {}

    socialSource: string;
    test = null;
    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasSkypeInformation: boolean;
    hasFacebookInformation: boolean;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;
    previewModalActivated: boolean = false;

    // Adding this property in order to avoid error in prod build
    t: any;

    ngOnInit() {
        this.socialSource = this.pagedItems.source;
        this.getHasTwitterAndWebsiteInformation();
    }
    
    ngAfterViewInit() {
        this.previewProfile();
    }
    
    @Input()
    pagedItems: any;
    
    @Input()
    savedSelectedProfiles: any = []

    @Output()
    sendSelectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendUnselectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendBuyProfileEvent: EventEmitter<any> = new EventEmitter();

    buyProfile(id) {
        this.sendBuyProfileEvent.emit(id);
    }

    checkCard(id: number) {
        this.sendSelectedProfilesEvent.emit(id);
    }

    uncheckCard(id: number) {
        this.sendUnselectedProfilesEvent.emit(id);
    }

    getCheckBoxesSaved(idProfile) {
        for(let i = 0; i < this.savedSelectedProfiles.length; i++) {
            if(this.savedSelectedProfiles[i].id === idProfile) {
                return true
            }
        }
        return false;
    }

    getHasTwitterAndWebsiteInformation() {
        if(this.pagedItems.contact_information.length > 0) {
            for(let i = 0; i < this.pagedItems.contact_information.length; i ++) {
                if(this.pagedItems.contact_information[i].pd_social_net === "twitter") {
                    this.hasTwitterInformation = true;
                }
                if(this.pagedItems.contact_information[i].pd_social_net === "website") {
                    this.hasWebsiteInformation = true;
                }
                if(this.pagedItems.contact_information[i].pd_social_net === "skype") {
                    this.hasSkypeInformation = true;
                }
                if(this.pagedItems.contact_information[i].pd_social_net === "facebook") {
                    this.hasFacebookInformation = true;
                }
                if(this.pagedItems.contact_information[i].pd_social_net === "linkedin") {
                    this.hasLinkedinInformation = true;
                }
                if(this.pagedItems.contact_information[i].pd_social_net === "github") {
                    this.hasGithubInformation = true;
                }
            }
        }
    } 

    getOuterStrokeColor() {
        if(this.pagedItems.match >= 75) {
            return '#a0c0ff';
        }

        if(this.pagedItems.match >= 60 && this.pagedItems.match <= 74) {
            return '#f49c00';
        }

        if(this.pagedItems.match <= 59) {
            return '#e01401';
        }
    }

    getInnerStrokeColor() {
        if(this.pagedItems.match >= 75) {
            return '#99ccff';
        }

        if(this.pagedItems.match >= 60 && this.pagedItems.match <= 74) {
            return '#e5c82d';
        }

        if(this.pagedItems.match <= 59) {
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
                        <p>${this.pagedItems.pd_position}</p>
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
        for(let i = 0; i < this.pagedItems.skills.length; i++) {
            skills.push(`<span class="badge">${this.pagedItems.skills[i]}</span>`)
        }
        return skills;
    }

    getDetails() {
        if(this.pagedItems.details.length > 0) {
            return this.pagedItems.details[0].pd_responsabilities;
        }
    }
}