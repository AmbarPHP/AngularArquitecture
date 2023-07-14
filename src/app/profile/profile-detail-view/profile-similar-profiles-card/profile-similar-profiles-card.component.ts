import { Component, Input } from '@angular/core';

@Component({
    selector: 'profile-similar-profiles-card',
    templateUrl: 'profile-similar-profiles-card.component.html',
    styleUrls: ['profile-similar-profiles-card.scss']
})

export class ProfileSimilarProfilesCardComponent {

    @Input()
    related_profiles: any;

}