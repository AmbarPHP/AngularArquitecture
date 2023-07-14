import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Constants } from "../_helpers/constants";
import { User } from "../_models/index";

@Injectable()
export class ProfileService {
    private filter: string;
    private initial_param: boolean;
    private append: string;
    checkoutCompleted: boolean = false;
    commingFromLandingSearch: boolean = false;
    profiles: any;
    pages: any;
    total: any;
    showResults: boolean;
    profilesCount: any;
    importedContactsState: boolean = false;
    public searchProfile: any = {
        profilesQtyTalent: 12,
        profilesQtyProfiles: 12,
        mainFilter: "",
        language: "",
        hasEmail: false,
        hasPicture: false,
        hasPhone: false,
        hasMobile: false,
        zourcingProfile: false,
        recommendedProfile: false,
        hasResume: false,
        yearOfExperience: "",
        searchById: "",
        education: 0,
        location: "",
        country: "",
        state: "",
        city: "",
        skills: [
            {
                display: "",
                value: ""
            }
        ],
        page: ""
    }

    constructor(private http: Http) {
        
    }


    getAllRelated(id = null) {
        return this.http.get(Constants.API_ENDPOINT + 'related-profiles/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    ownedBy() {
        return this.http.get(Constants.HTTP_ENDPOINT + 'chat/sessions/profiles/', this.jwt()).map((response: Response) => response.json());
    }

    getAll(owned = false, page = null, profilesQty) {
        this.filter = "";
        let detailed = "&detailed=" + false;
        let qty = "&page_size=" + profilesQty;

        if (page) {
            this.filter = "?page=" + page + detailed;
            this.initial_param = true;
        }

        if (this.initial_param) {
            this.append = "&"
        } else {
            this.append = "?"
        }
        if(owned === false) {
            this.filter += this.append
        } else {
            this.filter += this.append + "owned=" + owned;
        }

        return this.http.get(Constants.API_ENDPOINT + 'profiles/' + this.filter + qty, this.jwt()).map((response: Response) => response.json());
    }

    getImportedContacts(owned = 'contacts', page = null) {
        let filter = "?page=1&detailed=false&owned=contacts";
        // let detailed = "&detailed=" + false;

        // if (page) {
        //     this.filter = "?page=" + page + detailed;
        //     this.initial_param = true;
        // }

        // if (this.initial_param) {
        //     this.append = "&"
        // } else {
        //     this.append = "?"
        // }
        // if(owned === 'contacts') {
        //     this.filter += this.append
        // } else {
        //     this.filter += this.append + "owned=" + owned;
        // }

        return this.http.get(Constants.API_ENDPOINT + 'profiles/' + filter, this.jwt()).map((response: Response) => response.json());
    }

    sendProfileEmail(id: number, email?) {
        return this.http.get(Constants.API_ENDPOINT + 'profiles/email/' + id + '/' + email + '/', this.jwt()).map((response: Response) => response.json());
    }

    sendProfileInvite(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'profiles/invite/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    sendProfilePdf(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'profiles/pdf/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    buyById(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'profiles/shop/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'profiles/' + id + '/', this.jwt()).map((response: Response) => response.json());
    }


    search(text_source: any,
        booleans_source: any,
        location: any,
        location_source_city_id: any,
        location_source_country_id: any,
        location_source_state_id: any,
        education_source: any,
        source_source: any,
        skills_source: any,
        yoe_source: any,
        id: any,
        language: any,
        detailed='false',
        owned,
        page_size,
        page,
        orderBy?: string) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        console.log("text text", text_source);

        if (text_source != '') {
            params.set('text', text_source);
        }
        if (yoe_source != '') {
            params.set('yoe', yoe_source);
        }
        if (location != '') {
            params.set('location', location)
        }
        if (location_source_city_id != '') {
            params.set('location_city_id', location_source_city_id);
        }
        if (location_source_country_id != '') {
            params.set('location_country_id', location_source_country_id);
        }
        if (location_source_state_id != '') {
            params.set('location_state_id', location_source_state_id);
        }
        if (education_source != '') {
            params.set('education', education_source);
        }
        if (booleans_source.length > 0) {
            params.set('booleans', booleans_source);
        }
        if (source_source > 0) {
            params.set('source', source_source);
        }

        if (id != '') {
            params.set('id', id);
        }

        if(page) {
            params.set("page", page);
        }

        if (language != '') {
            params.set('language', language);
        }

        if (page_size != '') {
            params.set('page_size', page_size);
        }

        if (owned != '') {
            params.set('owned', owned)
        }

        if (orderBy != '') {         
            params.set('order_by', orderBy);
        }

        params.set('detailed', detailed);


        if (skills_source.length > 0) {
            let skills = '';
            let skill_values = []
            for (let s in skills_source) {
                skill_values.push(skills_source[s].value) 
            }
            skills = skill_values.toString()

            params.set('skills', skills);
        }

        let options = new RequestOptions({
            search: params
        });

        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            options = new RequestOptions({ headers: headers, search: params });
        }

        return this.http.get(Constants.API_ENDPOINT + 'profiles/', options).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(Constants.API_ENDPOINT + 'profiles/', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(Constants.API_ENDPOINT + 'profiles/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(Constants.API_ENDPOINT + 'profiles/' + id, this.jwt()).map((response: Response) => response.json());
    }

    showResultsCount() {
        if(this.searchProfile.mainFilter != '' || this.searchProfile.language != '' || this.searchProfile.hasEmail == true || this.searchProfile.hasPicture == true || this.searchProfile.hasPhone == true || this.searchProfile.hasMobile == true || this.searchProfile.location != '' || this.searchProfile.yearOfExperience != '' || this.searchProfile.education != 0 || this.searchProfile.recommendedProfile != '' || this.searchProfile.zourcingProfile != '' || this.searchProfile.hasResume == true) {
            if(this.profilesCount > 0 && this.profiles.length > 0) {
                this.showResults = true;
                console.log("Profiles", this.profilesCount);
            } else {
                this.showResults = false;
            }
        } else {
            this.showResults = false;
        }
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let auth_type = localStorage.getItem('auth_type') || 'Bearer';
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            let headers = new Headers({ 'Authorization': auth_type + ' ' + token, 'Content-Type': 'application/json' });
            return new RequestOptions({ headers: headers });
        }
    }
}