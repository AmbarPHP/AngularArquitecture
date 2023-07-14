import { Component, Input } from '@angular/core';

@Component({
    selector: 'talent-similar-profiles-card',
    templateUrl: 'talent-similar-profiles-card.component.html',
    styleUrls: ['talent-similar-profiles-card.scss']
})

export class TalentSimilarProfilesCard {

    @Input()
    related_profiles: any;
}