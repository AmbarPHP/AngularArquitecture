import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from "../../_services/profile.service";

@Component({
    selector: 'profile-left-filters',
    templateUrl: 'profile-left-filters.component.html',
    styleUrls: ['profile-left-filters.scss']
})

export class ProfileLeftFiltersComponent {
    // leftFilterLanguage: { label: string; value: string; }[];
    search_skills:any = this.savedSkills();
    skills_list:any = [];
    location_list: any = [];
    booleans: any = [];
    clearFilters: any = [];
    search_location_country_id: any = [];
    search_location_city_id: any = [];
    yearsOfExperience: any = this._profileService.searchProfile.yearOfExperience;
    education: any = this._profileService.searchProfile.education;
    stateFilter: any;

    
    @Input()
    filters_mobile: boolean;

    @Input()
    checkBoxFiltersStatus: any;

    @Input()
    countryFilter;

    @Input()
    cityFilter;

    @Input()
    selectedCountry;

    @Input()
    leftFilterCountry;

    @Input()
    leftFilterStates;

    @Input()
    leftFilterLanguage: any;

    @Input()
    languageFilter: any;

    @Input()
    leftFilterCities;

    @Input()
    search_by_id: any;

    @Input()
    byId: any;

    @Input()
    location: any;


    constructor(public _profileService: ProfileService) {
        this.skills_list = ['Python', '.Net', 'Java', 'Php'];
        this.location_list = [
            {
                label: 'Canada',
                value: 'CND'
            },
            {
                label: 'Mexico',
                value: 'MEX'
            }
        ]
    }

    ngOnInit() {
    }

    clearAll() {
        this.search_skills = [];
        this.booleans = [];
        this.yearsOfExperience = "";
        this.education = 0;
        this.checkBoxFiltersStatus.hasPicture = false;
        this.checkBoxFiltersStatus.hasEmail = false;
        this.checkBoxFiltersStatus.hasPhone = false;
        this.checkBoxFiltersStatus.hasMobile = false;
        this.checkBoxFiltersStatus.zourcingProfile = false;
        this.checkBoxFiltersStatus.recommendedProfile = false;
        this.search_location_city_id = [];
        this.search_location_country_id = [];
        this.languageFilter = [];

        this.clearFilters = [
            {
                search_skills: this.search_skills,
                hasPicture: this.checkBoxFiltersStatus.hasPicture,
                hasEmail: this.checkBoxFiltersStatus.hasEmail,
                hasPhone: this.checkBoxFiltersStatus.hasPhone,
                hasMobile: this.checkBoxFiltersStatus.hasMobile
            }
        ]
        this.sendClearFiltersEvent.emit(this.clearFilters[0])
    }

    @Output()
    sendBooleansEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendCheckBoxesStatus: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSearchSkillsEvent: EventEmitter<any> =  new EventEmitter();

    @Output()
    sendClearFiltersEvent: EventEmitter<any> =  new EventEmitter();

    @Output()
    sendLocationCountryEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendLocationCityEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendFiltersMobileEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendClearAllMobileEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendYearsOfExperienceEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendEducationEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendCountryFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendLanguageFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendCityFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendStateFilterEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSearchById: EventEmitter<any> = new EventEmitter();

    @Output()
    sendLocationEvent: EventEmitter<any> = new EventEmitter();

    sendSkillsList(skillValue) {
        this.search_skills.push({display: skillValue, value: skillValue})
        $("#skills-input").val("");
        this.sendSearchSkillsEvent.emit(this.search_skills);
    }

    removeSkillFromList(index) {
        this.search_skills.splice(index, 1);
        this.sendSearchSkillsEvent.emit(this.search_skills);
    }

    // sendSkillsListEmpty() {
    //     this.sendSearchSkillsEmptyEvent.emit(this.search_skills);
    // }

    hasPictureSelected() {
        this.booleans.push("profile_picture");
        this._profileService.searchProfile.hasPicture = true;
        this.sendBooleansEvent.emit(this.booleans);
        // this.sendCheckBoxesStatus.emit(this.checkBoxFiltersStatus);
    }
    hasPictureNoSelected() {
        this.removeCheckboxFilter(this.booleans, "profile_picture");
        this._profileService.searchProfile.hasPicture = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasEmailSelected() {
        this.booleans.push("email");
        this._profileService.searchProfile.hasEmail = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasEmailNoSelected() {
        this.removeCheckboxFilter(this.booleans, "email");
        this._profileService.searchProfile.hasEmail = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasPhoneSelected() {
        this.booleans.push("home");
        this.booleans.push("mobile");
        this._profileService.searchProfile.hasPhone = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasPhoneNoSelected() {
        this.removeCheckboxFilter(this.booleans, "home");
        this.removeCheckboxFilter(this.booleans, "mobile");
        this._profileService.searchProfile.hasPhone = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasMobileSelected() {
        this.booleans.push("mobile");
        this._profileService.searchProfile.hasMobile = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    
    hasMobileNoSelected() {
        this.removeCheckboxFilter(this.booleans, "mobile");
        this._profileService.searchProfile.hasMobile = false;
        this.sendBooleansEvent.emit(this.booleans);
    }
    
    hasZourcingSelected() {
        this.booleans.push("organic");
        this._profileService.searchProfile.zourcingProfile = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasZourcingNoSelected() {
        this.removeCheckboxFilter(this.booleans, "organic");
        this._profileService.searchProfile.zourcingProfile = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasRecommendedSelected() {
        this.booleans.push("recommended");
        this._profileService.searchProfile.recommendedProfile = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasRecommendedNoSelected() {
        this.removeCheckboxFilter(this.booleans, "recommended");
        this._profileService.searchProfile.recommendedProfile = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasResumeSelected() {
        this.booleans.push("attachments");
        this._profileService.searchProfile.hasResume = true;
        this.sendBooleansEvent.emit(this.booleans);
    }

    hasResumeNoSelected() {
        this.removeCheckboxFilter(this.booleans, "attachments");
        this._profileService.searchProfile.hasResume = false;
        this.sendBooleansEvent.emit(this.booleans);
    }

    removeCheckboxFilter(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    countryChange(val) {
        this.search_location_country_id = val;
        this.sendLocationCountryEvent.emit(this.search_location_country_id);
    }

    cityChange(val) {
        this.search_location_city_id = val;
        this.sendLocationCityEvent.emit(this.search_location_city_id)
    }

    filterMobile() {
        this.filters_mobile = !this.filters_mobile;
        this.sendFiltersMobileEvent.emit(this.filters_mobile);
    }

    clearAllMobile() {
        this.sendClearAllMobileEvent.emit();
    }

    yearsOfExperienceFilter(event) {
        this.sendYearsOfExperienceEvent.emit(event);
    }

    educationFilter(event) {
        this.sendEducationEvent.emit(event);
    }

    savedSkills() {
        if(this._profileService.searchProfile.skills[0].display === "" && this._profileService.searchProfile.skills[0].value === "") {
            return [];
        } else {
            return this._profileService.searchProfile.skills;
        }
    }


    languageFilterFunction(event) {
        this.sendLanguageFilterEvent.emit(event);
    }

    countryFilterFunction(event) {
        this.sendCountryFilterEvent.emit(event);
    }

    stateFilterFunction(event) {
        this.sendStateFilterEvent.emit(event);
    }

    cityFilterFunction(event) {
        this.sendCityFilterEvent.emit(event);
    }

    searchById(value) {
        this.sendSearchById.emit(value)
    }

    getLocationEvent(event) {
        this.sendLocationEvent.emit(event);
    }
 }