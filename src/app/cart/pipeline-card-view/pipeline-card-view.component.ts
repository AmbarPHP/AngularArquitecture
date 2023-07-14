import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'pipeline-card-view',
    templateUrl: 'pipeline-card-view.component.html',
    styleUrls: ['pipeline-card-view.scss']
})

export class PipeLineCardViewComponent {

    constructor(private router: Router) {}

    socialSource: any;

    @Input()
    pagedItems: any;

    @Input()
    savedSelectedProfiles: any = []

    @Output()
    sendSelectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    @Output()    
    sendUnselectedProfilesEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        console.log("pagedItems", this.pagedItems)
        this.socialSource = this.pagedItems.profile.source;
    }

    ngAfterViewInit() {
        if(this.pagedItems.type != 'Membership') {
            this.previewProfile();
        }
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

    previewProfile() {
        $(".preview-icon").popover({
            placement: 'auto',
            template: '<div class="popover" role="tooltip" style="width="500px"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
            html: true,
            content: `
                    <div>
                        <p>Position:</p>
                        <p>${this.pagedItems.profile.pd_position}</p>
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
        for(let i = 0; i < this.pagedItems.profile.skills.length; i++) {
            skills.push(`<span class="badge">${this.pagedItems.profile.skills[i]}</span>`)
        }
        return skills;
    }

    getDetails() {
        if(this.pagedItems.profile.details.length > 0) {
            return this.pagedItems.profile.details[0].pd_responsabilities;
        }
    }
}
