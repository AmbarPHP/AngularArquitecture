import { AuthenticationService } from './../../_services/authentication.service';
import { Router } from '@angular/router';
import { Constants } from '../../_helpers/constants';
import { ProfileService } from '../../_services/profile.service';



import { Component, Input } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
    selector: 'intro-autocomplete',
    templateUrl: 'intro-autocomplete-input.component.html',
    styleUrls: ['intro-autocomplete-input.component.scss']
})
export class IntroAutocompleteInputComponent {
    @Input()
    type: any;

    public searchStr: string;
    public captain: string;
    public dataService: CompleterData;

    constructor(private completerService: CompleterService,
                private router: Router,
                private authenticationService: AuthenticationService,
                private _profileService: ProfileService) {
        this.dataService = completerService.remote(Constants.API_ENDPOINT + 'term-search/?term=', 'term', 'term');
    }


    search() {
        console.log('search');
        if(this.type === 'candidate') {
            this.router.navigate(['/vacancies-candidate'], { queryParams: { term: this.searchStr } });
        }else{
            this._profileService.searchProfile.mainFilter = this.searchStr || '';
            this._profileService.commingFromLandingSearch = true;
            this.router.navigate(['/profiles']);
        }
        
    }
}