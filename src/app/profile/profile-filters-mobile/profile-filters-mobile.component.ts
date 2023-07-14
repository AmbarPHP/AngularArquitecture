import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from "../../_services/location.service";
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'profile-filters-mobile',
    templateUrl: 'profile-filters-mobile.component.html',
    styleUrls: ['profile-filters-mobile.scss']
})

export class ProfileFiltersMobileComponent {

    constructor(private _locationService: LocationService,
                private _profileService: ProfileService,
                private fb: FormBuilder) {}

    @Output()
    sendApplyMobileFiltersEvent: EventEmitter<any> = new EventEmitter();

    @Input()
    leftFilterLanguage: any;

    @Input()
    checkBoxFiltersStatus: any;

    @Input()
    languageFilter: any;

    mobileFiltersForm: FormGroup;

    locationValue: string = '';

    booleans: any = [];

    ngOnInit() {
        this.locationValue = this._profileService.searchProfile.location;
        console.log("oninit", this.locationValue);
        this.createForm();

    }

    createForm() {
        this.mobileFiltersForm = this.fb.group({
            language: [this._profileService.searchProfile.language || ''],
            location: [this._profileService.searchProfile.location || ''],
            emailCheckbox: [this.checkBoxFiltersStatus.hasEmail || ''],
            photoCheckbox: [this.checkBoxFiltersStatus.hasPicture || ''],
            phoneCheckbox: [this.checkBoxFiltersStatus.hasPhone || ''],
            zourcingCheckbox: [this.checkBoxFiltersStatus.zourcingProfile || ''],
            recommendedCheckbox: [this.checkBoxFiltersStatus.recommendedProfile || ''],
            resumeCheckbox: [this.checkBoxFiltersStatus.hasResume || ''],
        })
    }

    getLocationEvent(event) {
        console.log("Test", event);
    }

    locationChange(event) {
        this.locationValue = event;
        this.mobileFiltersForm.get('location').setValue(this.locationValue);
        console.log("Event", this.locationValue);
    }

    applyMobileFilters() {
        let event = {
            formValue: this.mobileFiltersForm.value,
            booleans:  this.booleans
        }
        this.sendApplyMobileFiltersEvent.emit(event);
    }

    clearAllMobileFilters() {
        this.mobileFiltersForm.reset();
        this.booleans = [];
    }

    hasPictureSelected() {
        this.booleans.push("profile_picture");
        this._profileService.searchProfile.hasPicture = true;
    }
    hasPictureNoSelected() {
        this.removeCheckboxFilter(this.booleans, "profile_picture");
        this._profileService.searchProfile.hasPicture = false;
    }

    hasEmailSelected() {
        this.booleans.push("email");
        this._profileService.searchProfile.hasEmail = true;
    }

    hasEmailNoSelected() {
        this.removeCheckboxFilter(this.booleans, "email");
        this._profileService.searchProfile.hasEmail = false;
    }

    hasPhoneSelected() {
        this.booleans.push("home");
        this.booleans.push("mobile");
        this._profileService.searchProfile.hasPhone = true;
    }

    hasPhoneNoSelected() {
        this.removeCheckboxFilter(this.booleans, "home");
        this.removeCheckboxFilter(this.booleans, "mobile");
        this._profileService.searchProfile.hasPhone = false;
    }

    hasZourcingSelected() {
        this.booleans.push("organic");
        this._profileService.searchProfile.zourcingProfile = true;
    }

    hasZourcingNoSelected() {
        this.removeCheckboxFilter(this.booleans, "organic");
        this._profileService.searchProfile.zourcingProfile = false;
    }

    hasRecommendedSelected() {
        this.booleans.push("recommended");
        this._profileService.searchProfile.recommendedProfile = true;
    }

    hasRecommendedNoSelected() {
        this.removeCheckboxFilter(this.booleans, "recommended");
        this._profileService.searchProfile.recommendedProfile = false;
    }

    hasResumeSelected() {
        this.booleans.push("attachments");
        this._profileService.searchProfile.hasResume = true;
    }

    hasResumeNoSelected() {
        this.removeCheckboxFilter(this.booleans, "attachments");
        this._profileService.searchProfile.hasResume = false;
    }

    removeCheckboxFilter(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }
    
}