import { Component, Input } from '@angular/core';
import { ProfileService } from '../../_services/';

@Component({
    selector: 'talent-list-view',
    templateUrl: 'talent-list-view.component.html',
    styleUrls: ['talent-list-view.scss']
})

export class TalentListViewComponent {
    skypeUrl: any;
    facebookUrl: any;

    constructor(private _ps: ProfileService){}

    socialSource: string;
    hasTwitterInformation: boolean;
    usernameTwitter: string;
    hasWebsiteInformation: boolean;
    hasSkypeInformation: boolean;
    hasFacebookInformation: boolean;
    websiteUrl: string;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;

    ngOnInit() {
        this.socialSource = this.items.source;
        this.getHasTwitterAndWebsiteInformation();
    }

    @Input()
    pagedItems: any;

    @Input()
    items: any;

    @Input()
    index: any;

    @Input()
    page: any;

    sendInvite() {
        this._ps.sendProfileInvite(this.items.id).subscribe(res => {
            console.log(res)
        },
        error => {
            console.log(error);
        })
    }

    getHasTwitterAndWebsiteInformation() {
        if(this.items.contact_information.length > 0) {
            for(let i = 0; i < this.items.contact_information.length; i ++) {
                if(this.items.contact_information[i].pd_social_net === "twitter") {
                    this.hasTwitterInformation = true;
                    this.usernameTwitter =  this.items.contact_information[i].pd_contact;
                }
                if(this.items.contact_information[i].pd_social_net === "website") {
                    this.hasWebsiteInformation = true;
                    this.websiteUrl =  this.items.contact_information[i].pd_contact;
                }
                if(this.items.contact_information[i].pd_social_net === "skype") {
                    this.hasSkypeInformation = true;
                    this.skypeUrl =  this.items.contact_information[i].pd_contact;
                }
                if(this.items.contact_information[i].pd_social_net === "facebook") {
                    this.hasFacebookInformation = true;
                    this.facebookUrl =  this.items.contact_information[i].pd_contact;
                }
                if(this.items.contact_information[i].pd_social_net === "linkedin") {
                    this.hasLinkedinInformation = true;
                }
                if(this.items.contact_information[i].pd_social_net === "github") {
                    this.hasGithubInformation = true;
                }
            }
        }
    }

}