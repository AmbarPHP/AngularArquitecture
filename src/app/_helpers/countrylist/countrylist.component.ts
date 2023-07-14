import { OnChange } from 'ngx-bootstrap/ng2-bootstrap';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DataService } from './dataservice';
import { Country } from './country';
import { City } from './city';
import { ProfileService } from "../../_services/profile.service";

@Component({
    selector: 'my-country-list',
    templateUrl: 'countrylist.component.html',
    styleUrls: ['./countrylist.component.scss'],
    providers: [DataService]
})
export class CountryListComponent {
    // selectedCountry: Country = new Country(this._profileService.searchProfile.country[0].id, this._profileService.searchProfile.country[0].name);
    @Input()
    selectedCountry: Country;

    selectedCity: City;

    countries: Country[];
    cities: City[];

    @Input() city;
    @Input() country;


    ngOnInit() {
        this.selectedCity = this.getCityOnInit();
    }

    constructor(private _dataService: DataService, public _profileService: ProfileService ) {
        this.countries = this._dataService.getCountries();
    }

    @Output() countryChange = new EventEmitter();
    @Output() cityChange = new EventEmitter();

    ngOnChanges(changes: any) {
        this.selectedCountry = this._dataService.findCountry(this.country);
        this.selectedCity = this._dataService.findCity(this.city);
        this.onSelect(this.country);
        this.onCitySelect(this.city);
    }

    onSelect(countryid) {
        this.countryChange.emit(countryid)
        this.cities = this._dataService.getCities().filter((item) => item.countryid == countryid);
    }

    onCitySelect(cityid) {
        this.cityChange.emit(cityid)
    }

    getCityOnInit() {
        if(this.selectedCountry.id != "") {
            console.log(this._profileService.searchProfile.city[0].id)
            this.selectedCity = this._dataService.findCity(this.city);
            this.cities = this._dataService.getCities().filter((item) => item.countryid == this.selectedCountry.id );
            return new City(this._profileService.searchProfile.city[0].id, '0', 'India')
        }
        else {
            console.log("get2")
            return new City('0', '0', 'India');
        }
    }
}
