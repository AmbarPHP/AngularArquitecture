import { Component, Input } from '@angular/core';

@Component({
    selector: 'talent-work-experience-card',
    templateUrl: 'talent-work-experience-card.component.html',
    styleUrls: ['talent-work-experience-card.scss']
})

export class TalentWorkExperienceCardComponent {

    @Input()
    profile: any;

    @Input()
    languages: any;

    @Input()
    projects: any;
}