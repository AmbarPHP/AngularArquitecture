import { Component, Input } from '@angular/core';
import { ProfileService } from '../../../_services/profile.service';
declare const Mark: any;

@Component({
    selector: 'profile-work-experience-card',
    templateUrl: 'profile-work-experience-card.component.html',
    styleUrls: ['profile-work-experience-card.scss']
})

export class ProfileWorkExperienceCardComponent {

    constructor(private _profileService: ProfileService) {}
    term: string;

    @Input()
    profile: any;

    @Input()
    languages: any;

    @Input()
    projects: any;

    ngAfterViewInit() {
        if (this.term) {
            var markInstance = new Mark(document.querySelector(".profile-work-experience-card"));
            console.log(markInstance)
            // Remove previous marked elements and mark
            // the new keyword inside the coebookntext
            markInstance.unmark({
                done: function () { }
            });
            markInstance.mark(this.term);
        }
    }

    ngOnInit() {

        console.log(this.languages);
        this.term = this._profileService.searchProfile.mainFilter;
        console.log(this.term)

    }
}

