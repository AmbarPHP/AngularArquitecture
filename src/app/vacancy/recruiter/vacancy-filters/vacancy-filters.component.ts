import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LocationService } from '../../../_services/index';

@Component({
    selector: 'vacancy-filters',
    templateUrl: 'vacancy-filters.component.html',
    styleUrls: ['vacancy-filters.scss']
})

export class VacancyFiltersComponent {
    term: any;
    countries: any;
    states: any;

    constructor(private _locationService: LocationService) {}

    ngOnInit() {
        this.getAllCountries()
    }

    @Output()
    sendVacancyTerm: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSearchTerm: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSearchTermMobile: EventEmitter<any> = new EventEmitter();

    @Output()
    sendCountryFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendStateFilterEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    searchByTitle: any;


    // valuechange(term) {
    //     this.term = term;
    //     this.sendVacancyTerm.emit(term);
    // }

    search(term) {
        this.term = term;
        this.sendSearchTerm.emit(term);
    }

    getAllCountries() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countries = res;
            console.log("countries", this.countries);
        })
    }

    getStates(countryId) {
        this.sendCountryFilterEvent.emit(countryId);
        if(countryId != "") {
            this._locationService.getStates(countryId).subscribe(res => {
                this.states = res;
                console.log("states", this.states);
            })
        } else {
            this.states = [];
        }
    }

    sendState(stateId) {
        this.sendStateFilterEvent.emit(stateId);
    }

    getSearchByTitle(searchByTitle) {
        this.sendSearchTerm.emit(searchByTitle);
    }

    getSearchByTitleMobile(searchByTitle) {
        this.sendSearchTermMobile.emit(searchByTitle);
    }


}