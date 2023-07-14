import { Component, Input } from '@angular/core';

@Component({
    selector: 'social-icons',
    templateUrl: 'social-icons.component.html',
    styleUrls: ['social-icons.component.scss']
})

export class SocialIconsComponent {

    @Input()
    profile: any;

    @Input()
    profileSource: any;

    @Input()
    contactInformation: any;

    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasSkypeInformation: boolean;
    hasFacebookInformation: boolean;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;
    usernameTwitter: any;
    websiteUrl: any;
    skypeUrl: any;
    facebookUrl: any;

    ngOnInit() {
        this.getSocialIcons();
    }

    getSocialIcons() {
        if(this.contactInformation.length > 0) {
            for(let i = 0; i < this.contactInformation.length; i ++) {
                if(this.contactInformation[i].pd_social_net === "twitter") {
                    this.hasTwitterInformation = true;
                    this.usernameTwitter =  this.contactInformation[i].pd_contact;
                }
                if(this.contactInformation[i].pd_social_net === "website") {
                    this.hasWebsiteInformation = true;
                    this.websiteUrl =  this.contactInformation[i].pd_contact;
                }
                if(this.contactInformation[i].pd_social_net === "skype") {
                    this.hasSkypeInformation = true;
                    this.skypeUrl =  this.contactInformation[i].pd_contact;
                }
                if(this.contactInformation[i].pd_social_net === "facebook") {
                    this.hasFacebookInformation = true;
                    this.facebookUrl =  this.contactInformation[i].pd_contact;
                }
                if(this.contactInformation[i].pd_social_net === "linkedin") {
                    this.hasLinkedinInformation = true;
                }
                if(this.contactInformation[i].pd_social_net === "github") {
                    this.hasGithubInformation = true;
                }
            }
        }
    } 
}