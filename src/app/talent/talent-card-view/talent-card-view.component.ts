import { Component, Input } from '@angular/core';
import { ProfileService } from '../../_services/'

@Component({
    selector: 'talent-card-view',
    templateUrl: 'talent-card-view.component.html',
    styleUrls: ['talent-card-view.scss']
})

export class TalentCardViewComponent {

    socialSource: string;
    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasFacebookInformation: boolean;
    hasSkypeInformation: boolean;
    websiteUrl: string;
    skypeUrl: string;
    facebookUrl: string;
    usernameTwitter: string;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;

    constructor(private _ps: ProfileService){}

    @Input()
    pagedItems: any;

    @Input()
    items: any;

    @Input()
    index: any;

    @Input()
    page: any;

    ngOnInit() {
        this.socialSource = this.items.source;
        this.getHasTwitterAndWebsiteInformation();
    }

    ngAfterViewInit() {
        this.previewProfile();
    }

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

    previewProfile() {
        $(".preview-icon").popover({
            placement: 'auto',
            template: '<div class="popover" role="tooltip" style="width="500px"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            html: true,
            content: `
                    <div>
                        <p>Position:</p>
                        <p>${this.items.pd_position}</p>
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
        for(let i = 0; i < this.items.skills.length; i++) {
            skills.push(`<span class="badge">${this.items.skills[i]}</span>`)
        }
        return skills;
    }

    getDetails() {
        if(this.items.details.length > 0) {
            return this.items.details[0].pd_responsabilities;
        }
    }
}