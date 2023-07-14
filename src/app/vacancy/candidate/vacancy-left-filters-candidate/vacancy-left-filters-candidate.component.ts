import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { LocationService } from '../../../_services/location.service';

@Component({
    selector: 'vacancy-left-filters-candidate',
    templateUrl: 'vacancy-left-filters-candidate.component.html',
    styleUrls: ['vacancy-left-filters-candidate.scss']
})

export class VacancyLeftFiltersCandidateComponent {

    constructor(private _locationService: LocationService) {}

    states: any;
    companyName: any;

    contractTypes: any;
    salaryRanges: any;
    dateOfJobs: any;
    filtersMobile: boolean = false;

    @Input()
    countries: any;

    @Output()
    sendCountryEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendStateEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendSalaryRangeEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendContractTypeEvent: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    sendCompanyNameEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendTermEvent: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    sendClearAllEvent: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    sendDateOfJobsEvent: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        // this.getAllCountries();
        this.getSalaryRanges();
        this.getContractTypes();
        this.getDateOfJobPositions();
    }

    // getAllCountries() {
    //     this._locationService.getAllCountries().subscribe(res => {
    //         this.countries = res;
    //     })
    // }

    getStates(countryId) {
        if(countryId != "") {
            this.sendCountryEvent.emit(countryId);
            this._locationService.getStates(countryId).subscribe(res => {
                this.states = res;
                console.log("states", this.states)
            })
        } else {
            this.states = [];
            this.sendCountryEvent.emit(countryId);
        }
    }

    getState(stateId) {
        this.sendStateEvent.emit(stateId);
    }

    getSalaryRange(rangeId) {
        this.sendSalaryRangeEvent.emit(rangeId);
    }

    getDateOfJobs(dateOfJobId) {
        this.sendDateOfJobsEvent.emit(dateOfJobId);
    }

    getContractType(contractType) {
        this.sendContractTypeEvent.emit(contractType);
    }

    valuechange(event) {
        this.companyName = event;
        this.sendCompanyNameEvent.emit(this.companyName);
    }

    getSalaryRanges() {
        this.salaryRanges = [ { value: 1, name: "More than 5000" }, { value: 2, name: "More than 10000" }, { value: 3, name: "More than 15000" }, { value: 4, name: "More than 20000" }, { value: 5, name: "More than 25000" }, { value: 6, name: "More than 30000" }, { value: 7, name: "More than 35000" }, { value: 8, name: "More than 40000" }, { value: 9, name: "More than 45000" }, { value: 10, name: "More than 50000" }, { value: 11, name: "More than 55000" }, { value: 12, name: "More than 60000" }, { value: 13, name: "More than 65000" }, { value: 14, name: "More than 70000" }, { value: 15, name: "More than 75000" }, { value: 16, name: "More than 80000" } ];
    }

    getContractTypes() {
        this.contractTypes = [ {value: 1, name: "Full Time"}, {value: 2, name: "Part Time"}, {value: 3, name: "Internship"}]
    }

    getDateOfJobPositions() {
        this.dateOfJobs = [ {value: 1, name: "Today"}, {value: 2, name: "3 days ago"}, {value: 3, name: "1 week ago"}, {value: 4, name: "15 days ago"}, {value: 5, name: "1 month ago"}];
    }

    changeFiltersMobile() {
        this.filtersMobile = !this.filtersMobile;
    }
    clearAll() {
        this.sendClearAllEvent.emit();
        this.states = [];
        this.salaryRanges = [];
        this.getSalaryRanges();
        this.contractTypes = [];
        this.getContractTypes();
        this.dateOfJobs = [];
        this.getDateOfJobPositions();
        this.companyName = "";
    }
}