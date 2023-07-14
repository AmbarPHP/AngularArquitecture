import {Component, OnInit} from "@angular/core";
import "../../assets/app.css";
import {Router} from "@angular/router";
import {VacancyService} from "../_services/vacancy.service";
import {Vacancy} from "../_models/index";
import {AlertService, PagerService, AuthenticationService} from "../_services/index";
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';


@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'vacancy.component.html',
    styleUrls: ['./vacancy-component.scss'],

})


export class VacancyComponent implements OnInit {
    languageFilter(arg0: any, arg1: any, arg2: any, arg3: any, arg4: any): any {
        throw new Error("Method not implemented.");
    }
    filterString: any;
    vacancies: Vacancy[] = [];
    loading:boolean = true;
    pagination: any;
    pagedItems: any;
    prueba1: any;
    cardsSelected: any = [];
    vacancyListView: boolean;
    userType: any;
    countryFilter: any = "";
    stateFilter: any = "";
    term: any;
    searchByTitle: any = "";

    getFilterString(term){
        this.filterString = term;
    }

    getSearchString(term){
        this.loading = true;
        this.searchByTitle = term;
        this.vacancyService.search(true, this.searchByTitle, this.countryFilter, this.languageFilter, this.stateFilter).subscribe(vacancies => {
            this.loading = false;
            this.vacancies = vacancies
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }

    getSearchStringMobile(event) {
        console.log("mobile", event)
        this.loading = true;
        this.searchByTitle = event;
        setTimeout(callback => {
            this.vacancyService.search(true, this.searchByTitle, this.countryFilter, this.languageFilter, this.stateFilter).subscribe(vacancies => {
                this.loading = false;
                this.vacancies = vacancies
                this.getPagination();
                this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
        }, 800)
    }

    getPagedItems(event){
        this.pagedItems = event;
    }

    constructor(private router:Router, 
                private vacancyService:VacancyService,
                private alertService:AlertService,
                private pagerService: PagerService,
                private _authenticationService: AuthenticationService,
                private _mixpanelTrackerService: mixpanelTrackerService) {

    }
    
    ngOnInit() {
        if(!this._authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } } );
        }
        this._mixpanelTrackerService.sendVisitedPage('Recruiter-Vacancies');
        this.loading = true;
        this.loadAllVacancies();
        this.userType = this._authenticationService.getUser()
        console.log("test", this.userType);

    }

    getPagination() {
        this.pagination = this.pagerService.getPager(this.vacancies.length, 1, 10)
    }

    private loadAllVacancies() {
        this.vacancyService.getAll().subscribe(vacancies => {
                this.loading = false;
                this.vacancies = vacancies
                this.cardsSelected = [];
                this.getPagination();
                this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    getCardsSelected(event) {
        this.cardsSelected = event;
    }

    getDeselectAll(event) {
        this.cardsSelected = event;
    }

    getVacancyListView(event) {
        this.vacancyListView = event;
    }

    getSendSuccessSubmitEvent(event) {
        this.loading = true;
        this.loadAllVacancies();
    }

    getDeleteVacancies(event) {
        this.loading = true;
        this.loadAllVacancies();
    }

    getSearchFilters(event) {
        console.log("filtro", event);
        this.term = "";
        this.countryFilter = event;
        this.vacancyService.search(true, this.searchByTitle, this.countryFilter, this.languageFilter, this.stateFilter).subscribe(res => {
            this.vacancies = res;
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        })
    }

    getStateFilter(event) {
        console.log("state filtro", event);
        this.term = "";
        this.stateFilter = event;
        this.vacancyService.search(true, this.searchByTitle, this.countryFilter, this.languageFilter, this.stateFilter).subscribe(res => {
            this.vacancies = res;
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        })
    }

    getSelectedCardEvent(event) {
        console.log("event select", event);
        this.cardsSelected.push(event);
    }

    getUnselectedCardEvent(event) {
        console.log("event unselect", event);
        this.removeSelectedProfile(this.cardsSelected, event);
    }

    removeSelectedProfile(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }
}