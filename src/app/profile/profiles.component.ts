import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ProfileService } from "../_services/profile.service";
import { LocationService } from "../_services/location.service";
import { Profile } from "../_models/index";
import { Country } from '../_helpers/countrylist/country';
import { AlertService, AuthenticationService, CartService, PagerService } from "../_services/index";
import { GlobalVars } from "../_helpers/globals";
import { Message } from "primeng/primeng";
import { FormControl } from "@angular/forms";
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';
import "rxjs/add/operator/debounceTime";
import { MembershipService } from '../_services/membership.service';

@Component({
    selector: 'profiles-component',
    templateUrl: 'profiles.component.html',
    styleUrls: ['profiles.scss']
})

export class ProfilesComponent {    
    total: any;
    total_rows: number[];
    pages: number[];
    search_language_id: any;
    loggedIn: boolean;
    param_term: any;
    private filter: any;
    filters_mobile: boolean = false;

    prueba123;
    profileListView: boolean = false;
    profiles: Profile[] = [];
    loading: boolean;
    // pager object
    pager: any = {};
    selectedProfiles: any = [];
    savedSelectedProfiles: any = [];
    // paged items
    pagedItems: any[];
    p: any;
    cart_id: any;
    currentUser: any;
    searchField: any;
    term = this.profileService.searchProfile.mainFilter;
    termMobile = new FormControl();
    msgs: Message[] = [];
    sources: any = [];
    education: any;
    skills: any = [];
    skills_list: any = [];
    search_yoe: any;
    yoe_list: any = [];
    // search_location: any;
    search_location_city_id: any;
    search_location_country_id: any;
    search_location_state_id: any;
    owned = "";
    detailed = 'false';
    search_by_id: any;
    leftFilterLanguage = [
        {
            label: 'MENU.PROFILES.FILTERS.LANGUAGES_OPTIONS.SPANISH',
            value: 'spanish'
        },
        {
            label: 'MENU.PROFILES.FILTERS.LANGUAGES_OPTIONS.ENGLISH',
            value: 'english'
        }
    ]
    // selectedCountry: Country = new Country(this.profileService.searchProfile.country[0].id, this.profileService.searchProfile.country[0].name);
    // selectedCountry: Country = new Country("1", "Mexico");
    location_list: any = [];
    languages_list: any;
    search_field: any;
    booleans: any = [];
    id: any;
    search_skills: any = [];
    search_education: any;
    countryFilter: any = "";
    cityFilter: any = "";
    stateFilter: any = "";
    checkBoxFiltersStatus = {
        hasEmail: this.profileService.searchProfile.hasEmail,
        hasPicture: this.profileService.searchProfile.hasPicture,
        hasPhone: this.profileService.searchProfile.hasPhone,
        hasMobile: this.profileService.searchProfile.hasMobile,
        zourcingProfile: this.profileService.searchProfile.zourcingProfile,
        recommendedProfile: this.profileService.searchProfile.recommendedProfile,
        hasResume: this.profileService.searchProfile.hasResume
    }

    leftFilterCountry: any;
    leftFilterStates: any;
    leftFilterCities: any;

    countriesMobileAfterClear: any;


    tabs: any = [
        { owned: false, name: 'Todos' },
        { owned: true, name: 'Mis Perfiles' },
    ];

    filterMobile = {
        search_location_country_id: [],
        search_location_state_id: [],
        search_location_city_id: [],
        yearsOfExperience: null,
        skills: []
    }

    // mobile Saved Values
    skillsMobile:any = [];
    countrySaved: any = "";
    stateSaved: any = "";
    citySaved: any = "";
    yoeSaved: any = "";
    skillsSaved: any = {

    }

    private selectedTab: any;
    // public searchProfile: any;
    profilePageUrl = "#/profiles";
    searchTerm = "term";
    orderBy: string = "";
    location: string;
    remainingCredits: any;
    zourcedProfile: any = [];

    constructor(private route: ActivatedRoute, private router: Router, private profileService: ProfileService, private alertService: AlertService,
                private global: GlobalVars, private authenticationService: AuthenticationService, private pagerService: PagerService, private cartService: CartService, private _locationService: LocationService,
                private _mixpanelTrackerService: mixpanelTrackerService,
                private _membershipService: MembershipService) {

        this.booleans = [];
        this.sources = [];
        this.skills = [];
        this.education = [];
        this.sources.push({ label: '---', value: null, logo: null });
        this.sources.push({
            label: 'Indeed',
            value: 'indeed',
            logo: 'http://deltafonts.com/wp-content/uploads/Indeed.jpg'
        });
        this.sources.push({ label: 'Zoho', value: 'zoho', logo: 'https://www.zoho.com/images/zoho-download.png' });
        this.sources.push({
            label: 'Facebook',
            value: 'facebook',
            logo: 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png'
        });
        this.sources.push({
            label: 'LinkedIn',
            value: 'linkedin',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png'
        });
        this.sources.push({
            label: 'Web del Programador',
            value: 'webdelprogramador',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png'
        });
        this.sources.push({
            label: 'Politecnico Nacional',
            value: 'politecnico_nacional',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png'
        });
        this.sources.push({
            label: 'StackOverflow',
            value: 'stackoverflow',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png'
        });
        this.sources.push({
            label: 'Github',
            value: 'github',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png'
        });
        this.search_field = this.sources[0];

        this.skills_list = ['Python', '.Net', 'Java', 'Php'];
        this.languages_list = ['english', 'spanish'];

        this.skills.push({
            label: 'Python',
            value: 'python',
        });

        this.skills.push({
            label: '.Net',
            value: '.net',
        });

        this.skills.push({
            label: 'Java',
            value: 'java',
        });

        this.skills.push({
            label: 'PHP',
            value: 'php',
        });

        this.education.push({
            label: '',
            value: '',
        });

        this.education.push({
            label: 'High School',
            value: 'high school',
        });


        this.education.push({
            label: 'Bachelor',
            value: 'bachelor',
        });

        this.education.push({
            label: 'Master',
            value: 'master',
        });


        for (let i = 0; i <= 5; i++) {
            this.yoe_list.push({
                label: i,
                value: i,
            });

        }

        this.location_list.push({
            label: '',
            value: '',
        });

        this.location_list.push({
            label: 'Canada',
            value: 'CND',
        });

        this.location_list.push({
            label: 'México',
            value: 'MEX',
        });

    }

    ngOnInit() {        
        if(!this.authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } } );
        } 
        this._mixpanelTrackerService.sendVisitedPage('profiles');
        this.selectedTab = this.tabs[0];
        this.currentUser = this.authenticationService.getUser();
        if(this.profileService.profiles && !this.profileService.checkoutCompleted) {
            this.profiles = this.profileService.profiles;
            this.pages = this.profileService.pages;
            this.total = this.profileService.total;
            this.search_language_id = this.profileService.searchProfile.language;
            this.search_yoe = this.profileService.searchProfile.yearOfExperience;
            this.location = this.profileService.searchProfile.location;
            this.search_education = this.profileService.searchProfile.education;
            this.term = this.profileService.searchProfile.mainFilter;
            if (this.profileService.searchProfile.hasEmail) {
                this.booleans.push("email");
            }
            if (this.profileService.searchProfile.hasPicture) {
                this.booleans.push("profile_picture");
            }
            if (this.profileService.searchProfile.hasPhone) {
                this.booleans.push("home");
            }
            if (this.profileService.searchProfile.hasMobile) {
                this.booleans.push("mobile");
            }
            if (this.profileService.searchProfile.zourcingProfile) {
                this.booleans.push("organic");
            }
            if (this.profileService.searchProfile.recommendedProfile) {
                this.booleans.push("recommended");
            }
            if (this.profileService.searchProfile.hasResume) {
                this.booleans.push("attachments");
            }
            this.setPage(this.profileService.searchProfile.page, this.profiles)
            console.log("aqui profiles", this.profiles);
        }
        if((this.profileService.commingFromLandingSearch || this.profileService.checkoutCompleted) && this.profileService.profiles) {
            this.loading = true;
            this.profiles = this.profileService.profiles;
            this.pages = this.profileService.pages;
            this.total = this.profileService.total;
            this.search_language_id = this.profileService.searchProfile.language;
            this.search_yoe = this.profileService.searchProfile.yearOfExperience;
            this.location = this.profileService.searchProfile.location;
            this.search_education = this.profileService.searchProfile.education;
            this.term = this.profileService.searchProfile.mainFilter;
            if (this.profileService.searchProfile.hasEmail) {
                this.booleans.push("email");
            }
            if (this.profileService.searchProfile.hasPicture) {
                this.booleans.push("profile_picture");
            }
            if (this.profileService.searchProfile.hasPhone) {
                this.booleans.push("home");
            }
            if (this.profileService.searchProfile.hasMobile) {
                this.booleans.push("mobile");
            }
            if (this.profileService.searchProfile.zourcingProfile) {
                this.booleans.push("organic");
            }
            if (this.profileService.searchProfile.recommendedProfile) {
                this.booleans.push("recommended");
            }
            if (this.profileService.searchProfile.hasResume) {
                this.booleans.push("attachments");
            }
            this.setPage(this.profileService.searchProfile.page, this.profiles)
            this.search();
            this.profileService.checkoutCompleted = false;
            
            // Reset the pagination if user is comming from landing search
            if(this.profileService.commingFromLandingSearch) {
                this.loading = true;
                this.profileService.searchProfile.page = 1;
                this.profileService.commingFromLandingSearch = false;
                this.setPage(this.profileService.searchProfile.page, this.profiles);
                this.search();
            }
        }
        if(!this.profileService.profiles) {
            this.loading = true;
            this.search();  
            this._locationService.getAllCountries().subscribe(res => {
                this.leftFilterCountry = res;
            });
        }
        this.getRemainingCredits();
    }

    onSelect(tab: any): void {
        this.loading = true;
        this.selectedTab = tab;
        this.loadAllProfiles(tab.owned, 1, this.getProfilesQty())
    }

    setPage(page: number, profiles) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.total, page, this.pagerService.profileCardsQty);
        // get current page of items
        this.pagedItems = profiles;        
        //this.pagedItems = this.profiles.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.loading = false;


        if (page < 1 || page > this.pager.totalPages) {
            this.loading = false;
            return;
        }


    }

    buyProfile(profile) {
        if (this.currentUser) {
            if(this.remainingCredits > 0) {
                console.log("Profile", profile)
                this.zourcedProfile.push(profile);
                console.log("ZourcedProfile", this.zourcedProfile)
                $('#credit-confirmation-modal').modal('show');
            } else {
                this.cartService.addProfile(this.currentUser, profile).subscribe(() => {
                    this.router.navigate(['/cart/checkout']);
                },
                    error => {
                    });
            }
        } else {
            this.msgs = [];
            if(localStorage.getItem('userLanguage') === 'es') {
                this.msgs.push({ severity: 'danger', summary: '', detail: 'Debes iniciar sesión para comprar.' });
            } else {
                this.msgs.push({ severity: 'danger', summary: '', detail: 'Login to start buying profiles.' });
            }

        }
    }

    addToCart() {
        // We iterate the array in the code
        for (let p of this.selectedProfiles) {
            if (this.currentUser) {
                this.cartService.addProfile(this.currentUser, p).subscribe(() => {

                },
                    error => {
                    });
            } else {
                this.cartService.addLocalProfile(p);
            }
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.' });

        this.selectedProfiles = [];
    }

    deselectAll() {
        this.selectedProfiles = [];
        this.savedSelectedProfiles = [];
    }

    addToCartMobile() {
        // We iterate the array in the code
        for (let p of this.selectedProfiles) {
            if (this.currentUser) {
                this.cartService.addProfile(this.currentUser, p).subscribe(() => {

                },
                    error => {
                    });
            } else {
                this.cartService.addLocalProfile(p);
            }
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.' });

        this.selectedProfiles = [];
        this.deselectAll();
    }

    enableLoading() {
        this.loading = true;
    }

    clearFilters() {
        this.loading = true;
        this.search_skills = [];
        this.search_education = [];
        this.search_location_city_id = [];
        this.search_location_country_id = [];
        this.booleans = [];
        this.search_by_id = '';
        this.search_language_id = '';
        this.term = new FormControl();
        this.loadAllProfiles(false, 1, this.getProfilesQty());
    }

    ngAfterViewInit() {
        this.loggedIn = this.authenticationService.isLoggedIn();
        
        this.param_term = this.route.snapshot.queryParams[this.searchTerm] || '';
     
    }

    searchDetail(){
        this.search('true');
    }

    search(detailed='false', page=1) {
        console.log("Entra a search")
        if(this.profileService.searchProfile.page != "") {
            page = this.profileService.searchProfile.page;
        };
        this.loading = true;
        this.profileService.search(this.term, this.booleans, this.location, this.search_location_city_id, this.search_location_country_id, this.search_location_state_id,  this.search_education, this.sources, this.search_skills, this.search_yoe, this.search_by_id, this.search_language_id, detailed, this.owned, this.getProfilesQty(), page, this.orderBy).subscribe(profiles => {
            this.loading = false;
            this.profileService.profilesCount = profiles.heading.total_count;
            this.profiles = profiles.rows;
            this.profileService.profiles = this.profiles;
            this.pages = profiles.heading.total_pages
            this.profileService.pages = this.pages;
            this.total = profiles.heading.total_count
            this.profileService.total = this.total;
            this.setPage(page, this.profiles);
            this.profileService.showResultsCount();
            if(this.filters_mobile) {
                this.filters_mobile = false;
            }
        },
            error => {
                // this.alertService.error(error);
                console.log("Error de busqueda");
                this.msgs = [];
                this.msgs.push({ severity: 'danger', summary: '', detail: 'La busqueda no se pudo realizar.' });
                this.loading = false;
            });

    }


    loadAllProfiles(owned = false, page=1, profilesQty) {
        console.log("entra all")
        this.profileService.getAll(owned, page, profilesQty).subscribe(profiles => {
            this.search_skills = [];
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

    profileListViewToogle(): void {
        this.profileListView = !this.profileListView;
        if (this.profileListView) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.profiles.length, 1, 6);
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
        this.loading = true;   
        // this.loadAllProfiles(false, event)
        this.search('false', event);
    }

    getprofileListView(event) {
        this.profileListView = event;
    }

    getSelectedProfiles(event) {
        this.selectedProfiles.push(event);
        this.savedSelectedProfiles.push({ id: event })
    }

    getUnselectedProfiles(event) {
        this.removeSelectedProfile(this.selectedProfiles, event);
        this.removeSavedSelectedProfile(event)
    }

    removeSelectedProfile(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    removeSavedSelectedProfile(event) {
        let arr = this.savedSelectedProfiles.filter(function (el) {
            return el.id !== event;
        });

        this.savedSelectedProfiles = arr;
    }

    getSearchSkills(event) {
        this.profileService.searchProfile.page = 1;
        this.search_skills = event;
        this.profileService.searchProfile.skills = this.search_skills
        if(this.profileService.searchProfile.skills.length == 0) {
            this.profileService.searchProfile.skills = [{display: "", value: ""}];
            console.log("aqui", this.profileService.searchProfile.skills)
        }
        console.log("skills1", this.search_skills)
        console.log("skills2", this.profileService.searchProfile.skills);

        this.search();
    }

    getSearchSkillsEmpty() {
        this.search_skills = event;
        this.loadAllProfiles(false, 1, this.getProfilesQty());
    }

    getClearFilters() {
        console.log("clear all")
        this.profileService.searchProfile.page = 1;
        this.profileService.searchProfile.profilesQtyProfiles = 12;
        this.loading = true;
        this.booleans = [];
        this.search_skills = [];
        this.profileService.searchProfile.skills = [{display: "", value: ""}]
        this.search_education = [];
        this.profileService.searchProfile.education = this.search_education;
        this.search_location_city_id = "";
        this.profileService.searchProfile.city = this.search_location_city_id;
        this.search_location_state_id = "";
        this.profileService.searchProfile.state = this.search_location_state_id;        
        this.search_location_country_id = "";
        this.search_by_id = "";
        this.profileService.searchProfile.country = this.search_location_country_id;
        this.search_yoe = "";
        this.profileService.searchProfile.yearOfExperience = this.search_yoe;
        this.profileService.searchProfile.searchById = this.search_by_id;
        this.search_language_id = "";
        this.term = "";
        this.profileService.searchProfile.mainFilter = this.term;
        this.profileService.searchProfile.language = this.search_language_id;
        this.profileService.searchProfile.hasEmail = false;
        this.profileService.searchProfile.hasPicture = false;
        this.profileService.searchProfile.hasPhone = false;
        this.profileService.searchProfile.hasMobile = false;
        this.profileService.searchProfile.zourcingProfile = false;
        this.profileService.searchProfile.recommendedProfile = false;
        this.profileService.searchProfile.hasResume = false;
        this.profileService.searchProfile.location = "";
        this.location = '';
        // console.log(event);
        // this.loadAllProfiles();
        this.search();
        // this.loadAllProfiles();
        // this.search();
        window.location.hash = this.profilePageUrl;
        localStorage.removeItem(this.searchTerm);
    }

    getYearsOfExperience(event) {
        console.log("yoe")
        this.profileService.searchProfile.page = 1;
        this.search_yoe = event;
        this.profileService.searchProfile.yearOfExperience = this.search_yoe;
        this.search();
    }

    getEducation(event) {
        console.log("education");
        this.profileService.searchProfile.page = 1;
        this.search_education = event;
        this.profileService.searchProfile.education = this.search_education;
        this.search();
    }

    getFiltersMobile(event) {
        this.term.setValue(event.profilename)
        this.search_location_country_id = event.search_location_country_id;
        this.profileService.searchProfile.country = this.search_location_country_id;
        this.search_location_state_id = event.search_location_state_id;
        this.profileService.searchProfile.state = this.search_location_state_id;
        this.search_location_city_id = event.search_location_city_id;
        this.profileService.searchProfile.city = this.search_location_city_id;
        this.search_skills = event.skills;
        this.search_yoe = event.yearsOfExperience;
        this.profileService.searchProfile.yearOfExperience = this.search_yoe;
        this.search()
        this.filters_mobile = false;
    }

    getClearAllMobile() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countriesMobileAfterClear = res;
            this.filterMobile = this.filterMobile = {
                search_location_country_id: this.countriesMobileAfterClear,
                search_location_state_id: [],
                search_location_city_id: [],
                yearsOfExperience: null,
                skills: []
            }
        })
        this.search_skills = [
            {
                display: "",
                value: ""
            }
        ];

        this.search_location_country_id = [];
        this.profileService.searchProfile.country = this.search_location_country_id;
        this.search_location_state_id = []
        this.profileService.searchProfile.state = this.search_location_state_id;
        this.search_location_city_id = []
        this.profileService.searchProfile.city = this.search_location_city_id;
        this.search_yoe = []
        this.profileService.searchProfile.yearOfExperience = this.search_yoe;

        this.profileService.searchProfile.skills = this.search_skills;

        this.skillsMobile = [];
        this.countrySaved = [];
        this.stateSaved = [];
        this.citySaved = [];
        this.yoeSaved = [];
        this.skillsSaved = {
            
        }
        $("#skill-input-mobile").val("");
        this.search();
        this.filters_mobile = false;
    }

    getBooleans(event) {
        console.log("booleans", event)
        this.profileService.searchProfile.page = 1;
        this.booleans = event;
        this.search();
    }

    savedBooleans() {
        if(this.profileService.searchProfile.hasEmail) {
            this.checkBoxFiltersStatus.hasEmail = true;
            this.booleans.push("email");
        }

        if(this.profileService.searchProfile.hasPicture) {
            this.checkBoxFiltersStatus.hasPicture = true;
            this.booleans.push("profile_picture")
        }

        if(this.profileService.searchProfile.hasPhone) {
            this.checkBoxFiltersStatus.hasPhone = true;
            this.booleans.push("home");
        }
        
        if(this.profileService.searchProfile.hasMobile) {
            this.checkBoxFiltersStatus.hasMobile = true;
            this.booleans.push("mobile");
        }

        if(this.profileService.searchProfile.zourcingProfile) {
            this.checkBoxFiltersStatus.zourcingProfile = true;
            this.booleans.push("organic");
        }

        if(this.profileService.searchProfile.recommendedProfile) {
            this.checkBoxFiltersStatus.recommendedProfile = true;
            this.booleans.push("recommended");
        }

        if(this.profileService.searchProfile.hasResume) {
            this.checkBoxFiltersStatus.hasResume = true;
            this.booleans.push("attachments");
        }
    }

    getCountryFilter(event) {
        if(event === "") {
            console.log("if country")
            this.profileService.searchProfile.page = 1;
            this.search_location_city_id = "";
            this.search_location_state_id = "";
            this.profileService.searchProfile.city = this.search_location_city_id;
            this.profileService.searchProfile.state = this.search_location_state_id;
            this.search_location_country_id = event;
            this.profileService.searchProfile.country = this.search_location_country_id;
            this.leftFilterStates = [];
            this.search();   
        } else {
            console.log("else country")
            this.profileService.searchProfile.page = 1;
            this.search_location_country_id = event;
            this.profileService.searchProfile.country = this.search_location_country_id;
            this._locationService.getStates(this.profileService.searchProfile.country).subscribe(res => {
                this.leftFilterStates = res;
            })
            this.search();
        }
    }

    getStateFilter(event) {
        console.log("state")
        this.profileService.searchProfile.page = 1;
        this.search_location_state_id = event;
        this.profileService.searchProfile.state = this.search_location_state_id;
        this._locationService.getCities(this.profileService.searchProfile.state).subscribe(res => {
            this.leftFilterCities = res;
        })
        this.search();
    }

    getLanguageFilter(event) {
        console.log("Language");
        this.profileService.searchProfile.page = 1;
        this.search_language_id = event;
        this.profileService.searchProfile.language = this.search_language_id;
        this.search();
    }

    getCityFilter(event) {
        console.log("city");
        this.profileService.searchProfile.page = 1;
        this.search_location_city_id = event;
        this.profileService.searchProfile.city = this.search_location_city_id;
        this.search();
    }

    getProfileCardsQty(qty: number) {
        console.log("cardqty1")
        this.pagerService.profileCardsQty = qty;
        this.search();
    }

    getChangeProfileCardsQty(qty: number) {
        console.log("cardqty2")
        this.pagerService.profileCardsQty = qty;
        this.search();
    }

    getSearchById(event) {
        this.search_by_id = event;
        this.profileService.searchProfile.searchById = this.search_by_id;
        this.search();
    }

    getMainSearch(event) {
        this.profileService.searchProfile.page = 1;
        this.term = event;
        this.profileService.searchProfile.mainFilter = this.term;
        this.search();
    }

    getPageSize(event) {
        this.profileService.searchProfile.page = 1;
        this.profileService.searchProfile.profilesQtyProfiles = event;
        this.pagerService.profileCardsQty = event;
        this.search();
    }

    getSearchOrderBy(event){        
        this.orderBy = event;   
        this.search(); 
    }

    getLocationEvent(event) {
        this.profileService.searchProfile.page = 1;
        this.location = event;
        this.profileService.searchProfile.location = this.location;
        this.search();
    }

    getProfilesQty() {
        return this.profileService.searchProfile.profilesQtyProfiles;
    }

    getRemainingCredits() {
        this._membershipService.getUserMembership().subscribe(res => {
            this.remainingCredits = res[0].remaining_credits;
        })
    }

    getMobileFilters(event) {
        console.log("mobile filters", event);
        this.booleans = event.booleans;
        this.location = event.formValue.location;
        this.search_language_id = event.formValue.language;
        
        // Save values in service
        this.profileService.searchProfile.language = this.search_language_id;
        this.profileService.searchProfile.page = 1;
        this.profileService.searchProfile.location = this.location;

        // Save booleans in service
        if(event.formValue.emailCheckbox) {
            this.profileService.searchProfile.hasEmail = true;
            this.checkBoxFiltersStatus.hasEmail = true;
        } else {
            this.profileService.searchProfile.hasEmail = false;
            this.checkBoxFiltersStatus.hasEmail = false;
        }
        if(event.formValue.photoCheckbox) {
            this.profileService.searchProfile.hasPicture = true;
            this.checkBoxFiltersStatus.hasPicture = true;
        } else {
            this.profileService.searchProfile.hasPicture = false;
            this.checkBoxFiltersStatus.hasPicture = false;
        }
        if(event.formValue.phoneCheckbox) {
            this.profileService.searchProfile.hasPhone = true;
            this.checkBoxFiltersStatus.hasPhone = true;
            this.profileService.searchProfile.hasMobile = true;
            this.checkBoxFiltersStatus.hasMobile = true;
        } else {
            this.profileService.searchProfile.hasPhone = false;
            this.checkBoxFiltersStatus.hasPhone = false;
            this.profileService.searchProfile.hasMobile = false;
            this.checkBoxFiltersStatus.hasMobile = false;
        }
        if(event.formValue.zourcingCheckbox) {
            this.profileService.searchProfile.zourcingProfile = true;
            this.checkBoxFiltersStatus.zourcingProfile = true;
        } else {
            this.profileService.searchProfile.zourcingProfile = false;
            this.checkBoxFiltersStatus.zourcingProfile = false;
        }
        if(event.formValue.recommendedCheckbox) {
            this.profileService.searchProfile.recommendedProfile = true;
            this.checkBoxFiltersStatus.recommendedProfile = true;
        } else {
            this.profileService.searchProfile.recommendedProfile = false;
            this.checkBoxFiltersStatus.recommendedProfile = false;
        }
        if(event.formValue.resumeCheckbox) {
            this.profileService.searchProfile.hasResume = true;
            this.checkBoxFiltersStatus.hasResume = true;
        } else {
            this.profileService.searchProfile.hasResume = false;
            this.checkBoxFiltersStatus.hasResume = false;
        }
        this.search();
    };

}