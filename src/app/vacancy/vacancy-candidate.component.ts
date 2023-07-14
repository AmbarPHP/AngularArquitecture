import { Router } from '@angular/router';
import { VacancyService } from '../_services/vacancy.service';
import {AlertService, PagerService, AuthenticationService, LocationService} from "../_services/index";
import { VacancyFilterPipe, VacancyPostedByFilterPipe } from '../_pipes/filterpipe.component';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'vacancy-candidate.component',
    templateUrl: 'vacancy-candidate.component.html',
    styleUrls: ['vacancy-candidate.scss']
})

export class VacancyCandidateComponent {
    jsonLD: SafeHtml;
    google_json_var: any;

    constructor(private _vacancyService: VacancyService,
                private _pagerService: PagerService,
                private _alertService: AlertService,
                private _locationService: LocationService,
                private _authenticationService: AuthenticationService,
                private router: Router,
                private sanitizer: DomSanitizer) {}

    pagination: any;
    vacancies: any = [];
    pagedItems: any;
    loading: boolean;
    countries: any;
    country: any = "";
    state: any = "";
    salaryRange: any = "";
    dateOfJob: any = "";
    contractType: any = "";
    companyName: any = "";
    searchByTitle: any = "";
    searchByTitleItems: any = "";
    vacancyListView: boolean = false;

    ngOnInit() {
        if(!this._authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } } );
        }
        this.loading = true;
        this.getAllCountries();
        this.getAllVacancies();
        this.getAllVacanciesGoogle();
    }


    getSafeHTML(value: {}) {
        const json = JSON.stringify(value, null, 2);
        const html = `${json}`;
        // Inject to inner html without Angular stripping out content
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }

    getAllVacanciesGoogle() {
        this._vacancyService.getGoogleAll().subscribe(res => {
            console.log(res)
            this.google_json_var = res;
            var script = document.createElement("script");

            // Add script content
            script.type='application/ld+json';
            script.innerHTML = this.google_json_var;
            // Append
            document.head.appendChild(script);
            this.jsonLD = this.getSafeHTML(this.google_json_var);
      },
        err => {
            this.loading = false;
            this._alertService.error(err);
        })
    } 

    getAllVacancies() {
        this._vacancyService.getAllForCandidates().subscribe(res => {
            this.loading = false;
            this.vacancies = res;
            console.log("vacancies", this.vacancies);
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        },
        err => {
            this.loading = false;
            this._alertService.error(err);
        })
    }

    getAllCountries() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countries = res;
        })
    }

    getPagination() {
        this.pagination = this._pagerService.getPager(this.vacancies.length, 1, 10)
    }

    getPaginationBytitle() {
        this.pagination = this._pagerService.getPager(this.searchByTitleItems.length, 1, 10)
    }

    getPagedItems(event){
        this.pagedItems = event;
    }

    searchForCandidates(country, state, salaryRange, dateOfJob, contractType, companyName, searchByTitle) {
        this.loading = true;
        this._vacancyService.searchForCandidates(country, state, salaryRange, dateOfJob, contractType, companyName, searchByTitle).subscribe(res => {
            this.vacancies = res;
            this.loading = false
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        })
    }

    getCountry(event) {
        if(event == "") {
            this.state = "";
        }
        this.country = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getState(event) {
        this.state = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getSalaryRange(event) {
        this.salaryRange = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getDateOfJobs(event) {
        this.dateOfJob = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getContractType(event) {
        this.contractType = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getCompanyName(event) {
        this.companyName = event;
        setTimeout(callback => {
            this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
            console.log("company", this.companyName);
        }, 800)
    }

    // getSearchByTitle(event) {
    //     console.log(event)
    //     this.searchByTitle = event;
    //     let newArray = new VacancyFilterPipe().transform(this.vacancies, this.searchByTitle);
    //     this.searchByTitleItems = newArray;
    //     this.getPaginationBytitle();
    //     this.pagedItems = this.searchByTitleItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    //     console.log(this.searchByTitleItems);
    // }

    getSearchByTitle(event) {
        this.searchByTitle = event;
        this.searchForCandidates(this.country, this.state, this.salaryRange, this.dateOfJob, this.contractType, this.companyName, this.searchByTitle);
    }

    getClearAll() {
        this.country = "";
        this.state = "";
        this.salaryRange = "";
        this.contractType = "";
        this.companyName = "";
        this.searchByTitle = "";
        this.dateOfJob = "";
        this.loading = true;
        this.countries = [];
        this.getAllVacancies();
        this.getAllCountries();
    }

    getVacancyListView(event) {
        this.vacancyListView = event;
    }
}