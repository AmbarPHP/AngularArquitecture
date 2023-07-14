import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'profile-cards-qty',
    templateUrl: 'profileCardsQty.component.html',
    styleUrls: ['profileCardsQty.scss']
})

export class ProfileCardsQtyComponent {

    constructor(private _profileService: ProfileService) {}

    profilesQtyActivated: number = 12;

    @Output()
    sendChangeProfileCardsQty: EventEmitter<any> = new EventEmitter();

    @Input()
    location: any;

    ngOnInit() {
        console.log("Test", this.location);
    }

    changeProfileCardsQty(qty: number) {
        this.profilesQtyActivated = qty;
        this._profileService.searchProfile.profilesQty = qty;
        this.sendChangeProfileCardsQty.emit(qty);
    }

    get getProfilesQty() {
        if(this.location == 'talent') {
            return this._profileService.searchProfile.profilesQtyTalent;
        }
        if(this.location == 'profiles') {
            return this._profileService.searchProfile.profilesQtyProfiles;
        }
    }
}