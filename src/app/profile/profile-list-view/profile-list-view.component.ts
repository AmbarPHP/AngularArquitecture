import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PagerService } from "../../_services/index";

@Component({
    selector: 'profile-list-view',
    templateUrl: './profile-list-view.component.html',
    styleUrls: ['./profile-list-view.scss']
})

export class ProfileListViewComponent implements OnInit {

    constructor(private pagerService: PagerService) {}

    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasSkypeInformation: boolean;
    hasFacebookInformation: boolean;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;

    // Adding this property in order to avoid error in prod build
    t: any;

    @Input()
    pagedItems:any;

    @Input()
    selectedProfiles: any =[];

    @Input()
    savedSelectedProfiles: any = []

    @Output()
    profileEmitter: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSelectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendUnselectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendBuyProfileEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.getHasTwitterAndWebsiteInformation();
    }

    ngAfterViewInit() {
        this.previewProfile();
    }

    buyProfile(profileId) {
        console.log("buy", profileId)
        this.sendBuyProfileEvent.emit(profileId);
    }

    selectProfileEmitter(event) {
        this.selectedProfiles = event;
        this.profileEmitter.emit(event);
    }

    getSendSelectedProfilesEvent(event) {
        this.sendSelectedProfilesEvent.emit(event);
    }

    getsendUnselectedProfilesEvent(event) {
        this.sendUnselectedProfilesEvent.emit(event);
    }

    getCheckBoxesSaved(idProfile) {
        for(let i = 0; i < this.savedSelectedProfiles.length; i++) {
            if(this.savedSelectedProfiles[i].id === idProfile) {
                return true
            }
        }
        return false;
    }

    checkCard(id: number) {
        this.sendSelectedProfilesEvent.emit(id);
    }

    uncheckCard(id: number) {
        this.sendUnselectedProfilesEvent.emit(id);
    }

    get getAttachments() {
        if(this.pagedItems.attachments) {
            if(this.pagedItems.attachments.length > 0) {
                return true
            } else {
                false;
            }
        }
    }

    getHasTwitterAndWebsiteInformation() {
        if(this.pagedItems.contact_information){
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
                        <p>${this.pagedItems.details[0].pd_responsabilities}</p>
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
}