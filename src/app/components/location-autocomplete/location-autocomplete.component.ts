import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from '../../_helpers/constants';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ProfileService } from '../../_services/profile.service';
import { AuthenticationService } from '../../_services';

@Component({
    selector: 'location-autocomplete',
    templateUrl: 'location-autocomplete.component.html',
    styleUrls: ['location-autocomplete.component.scss']
})

export class LocationAutocompleteComponent {

    constructor(private completerService: CompleterService,
                private _profileService: ProfileService,
                private authenticationService: AuthenticationService) {
        const lang = this.authenticationService.getLanguage();
        const results = this.completerService.remote(Constants.API_ENDPOINT + 'location-term-search/?lang=' + lang + '&term=', 'term,lang', 'term');
        this.dataService = results;
    }

    public dataService: CompleterData;

    @Output()
    sendLocationEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    locationStr: any;

    updateDataService() {
        const lang = this.authenticationService.getLanguage();
        const results = this.completerService.remote(Constants.API_ENDPOINT + 'location-term-search/?lang=' + lang + '&term=', 'term,lang', 'term');
        this.dataService = results;
    }

    search() {
        this._profileService.searchProfile.location = this.locationStr;
        this.sendLocationEvent.emit(this.locationStr);
    }

}
