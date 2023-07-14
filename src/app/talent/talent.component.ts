import {Component, OnInit} from "@angular/core";
import "../../assets/app.css";
import {Router} from "@angular/router";
import {ProfileService} from "../_services/profile.service";
import {Profile} from "../_models/index";
import {AlertService, AuthenticationService, PagerService, CartService} from "../_services/index";
import {GlobalVars} from "../_helpers/globals";
import {Message} from "primeng/primeng";
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';


declare const FB:any;



@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'talent.component.html',
    styleUrls: ['talent.scss']

})


export class TalentComponent implements OnInit {
    boughtProfilesState: boolean = true;
    total: any;
    pages: number[];
    filterString: string;
    talentListView:boolean = false;
    profiles:Profile[] = [];
    loading:boolean;
    // pager object
    pager:any = {};
    selectedProfiles:any = [];
    // paged items
    pagedItems:any[];
    p:any;
    cart_id:any;
    currentUser:any;
    searchField:any;
    private filter:any;
    msgs:Message[] = [];
    sources:any;
    education:any;
    skills:any;
    skills_list:any;
    search_yoe:any;
    yoe_list:any = [];
    search_location:any;
    location_list:any = [];
    languages_list:any;
    search_field:any;
    booleans:any;
    id:any;
    search_skills:any;
    search_education:any;
    talentMainFilter: string = "";
    page: any;

    importedContacts: any;
    loadingImportedContacts: boolean = true;

    dropdownOptionSelected: any;


    tabs:any = [
        {owned: false, name: 'Todos'},
        {owned: true, name: 'Mis Perfiles'},
    ];

    private selectedTab:any;


    constructor(private router:Router, public profileService:ProfileService, private alertService:AlertService,
                private global:GlobalVars, private authenticationService:AuthenticationService, private pagerService:PagerService, private cartService:CartService,
                private _mixpanelTrackerService: mixpanelTrackerService) {


    }

    ngOnInit() {
        if(!this.authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } } );
        }
        this._mixpanelTrackerService.sendVisitedPage('Talent')
        this.selectedTab = this.tabs[0];

        this.loading = true;
        if(this.boughtProfilesState && !this.profileService.importedContactsState) {
            this.dropdownOptionSelected = "1";
        }
        if(!this.boughtProfilesState || this.profileService.importedContactsState) {
            this.dropdownOptionSelected = "2";
        }
        this.loadAllProfiles(true, 1, this.getProfilesQty());
        console.log("Profiles qty", this.getProfilesQty());
        this.getImportedContacts();
    }

    zource(){
        this.router.navigate(['/profiles']);
    }


    onSelect(tab:any):void {
        this.loading = true;
        this.selectedTab = tab;
        this.loadAllProfiles(tab.owned, 1, this.getProfilesQty())
    }

    setPage(page:number, profiles) {
        this.page = page;
        // get pager object from service
        this.pager = this.pagerService.getPager(this.total, page, this.pagerService.profileCardsQty);
        // get current page of items
        this.pagedItems = profiles;
        console.log(this.pagedItems)
        this.loading = false;
        console.log("Loading setpage", this.loading);
        
        if (page < 1 || page > this.pager.totalPages) {
            this.loading = false;
            return;
        }

    }

    chatProfile(profile) {
        this.router.navigate(['/chat']);
    }


    deselectAll() {
        this.selectedProfiles = []
    }

    search(detailed='false', page=1) {
        this.loading = true;
        this.profileService.search(this.talentMainFilter, "", "", "", "", "", "", "", "", "", "", "", detailed, true, this.getProfilesQty(), page).subscribe(profiles => {
            this.loading = false;
            console.log("Loading", this.loading);
            this.profiles = profiles.rows;
            this.pages = profiles.heading.total_pages
            this.total = profiles.heading.total_count
            console.log(this.pages)
            this.setPage(page, this.profiles);
        },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });

    }


    loadAllProfiles(owned = true, page=1, profilesQty) {
        this.profileService.getAll(owned, page, profilesQty).subscribe(profiles => {
                this.loading = false;
                this.profiles = profiles.rows;
                this.pages = profiles.heading.total_pages
                this.total = profiles.heading.total_count
                this.setPage(page, this.profiles);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    getFilterString(term){
        this.filterString = term;
    }

    talentListViewToogle():void {
        this.talentListView = !this.talentListView;
        if (this.talentListView) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.profiles.length, 1, 12);
            // get current page of items
            this.pagedItems = this.profiles.slice(this.pager.startIndex, this.pager.endIndex + 1);
        } else {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.profiles.length, 1, 6);
            // get current page of items
            this.pagedItems = this.profiles.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    selectProfileEmitter(event) {
        this.selectedProfiles = event;
    }

    getPagination(event) {
        // this.pagedItems = event;
        this.loading = true;
        this.search('false', event);
    }

    getChangeProfileCardsQty(event) {
        this.pagerService.profileCardsQty = event;
        // this.page_size = event;
        this.profileService.searchProfile.profilesQtyTalent = event;
        this.loading = true;
        this.search('false');
    }

    getTalentMainFilter(event) {
        console.log("Aqui", event);
        this.talentMainFilter = event;
        this.search();
    }

    getBoughtProfilesStateEvent(event) {
        this.boughtProfilesState = event;
        console.log("Prueba prueba", this.boughtProfilesState);
        if(this.boughtProfilesState) {
            this.dropdownOptionSelected = "1";
        } else {
            this.dropdownOptionSelected = "2";
        };
    }

    getProfilesQty() {
        return this.profileService.searchProfile.profilesQtyTalent;
    }

    getImportedContacts() {
        this.profileService.getImportedContacts().subscribe(res => {
            this.importedContacts = res.rows;
            this.loadingImportedContacts = false;
            console.log("Imported contcts", this.importedContacts);
        }, err => {
            console.log("Error al mostrar contactos importados", err);
        });
    }
}