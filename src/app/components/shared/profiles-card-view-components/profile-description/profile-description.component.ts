import { Component, Input } from '@angular/core';

@Component({
    selector: 'profile-description',
    templateUrl: 'profile-description.component.html',
    styleUrls: ['profile-description.component.scss']
})

export class ProfileDescriptionComponent {

    @Input()
    profile: any;
}