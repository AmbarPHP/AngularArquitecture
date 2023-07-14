import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'talent-header',
    templateUrl: 'talent-header.component.html',
    styleUrls: ['talent-header.scss']
})

export class TalentHeaderComponent {

    constructor(public _profileService: ProfileService) {}

    @Input()
    talentListView: boolean;

    @Input()
    boughtProfilesState: boolean;

    @Input()
    dropdownOptionSelected: any;

    @Output()
    sendTalentListViewEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendChangeProfileCardsQtyEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    changeBoughtProfilesStateEvent: EventEmitter<any> = new EventEmitter();

    talentListViewToogle() {
        this.talentListView = !this.talentListView;
        this.sendTalentListViewEvent.emit(this.talentListView);
    }

    getChangeProfileCardsQty(event) {
        this.sendChangeProfileCardsQtyEvent.emit(event);
    }

    sendBoughtProfilesStateEvent(state) {
        this._profileService.importedContactsState = false;
        this.changeBoughtProfilesStateEvent.emit(state);
    }

    dropdownValue(event) {
        if(event == 1) {
            this.changeBoughtProfilesStateEvent.emit(true);
            this._profileService.importedContactsState = false;
        }
        if(event == 2) {
            this.changeBoughtProfilesStateEvent.emit(false);
            this._profileService.importedContactsState = false;
        }
    }

}