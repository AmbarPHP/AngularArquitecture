import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response, URLSearchParams} from "@angular/http";
import {Constants} from "../_helpers/constants";
import {User} from "../_models/index";

@Injectable()
export class VacancyService {
    constructor(private http:Http) {
    }

    getAll() {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + '?owned=true&detailed=false', this.jwt()).map((response:Response) => response.json());
    }

    getAllDetailed() {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + '?owned=true&detailed=true', this.jwt()).map((response:Response) => response.json());
    }

    getGoogleAll() {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies-google/', this.jwt()).map((response:Response) => response.json());
    }

    getAllForCandidates() {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/', this.jwt()).map((response:Response) => response.json());
    }

    get(id:number) {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + id + '/', this.jwt()).map((response:Response) => response.json());
    }

    sendEmail(id:number){
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/email/' + id + '/', this.jwt()).map((response:Response) => response.json());        
    }

    search(owned, term, country, language, state) {
        let params: URLSearchParams = new URLSearchParams();
        if(owned != '') {
            params.set('owned', owned);
        }
        if(term != '') {
            params.set('term', term);
        }

        if(country != '') {
            params.set('language', country);
        }
        
        if(country != '') {
            params.set('location_country_id', country);
        }

        if(state != '') {
            params.set('location_state_id', state);
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
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/', options).map((response:Response) => response.json());
    }

    searchForCandidates(country, state, salaryRange, dateOfJob, contractType, companyName, searchByTitle) {
        let params: URLSearchParams = new URLSearchParams();

        if(country != '') {
            params.set('location_country_id', country);
        }

        if(state != '') {
            params.set('location_state_id', state);
        }

        if(salaryRange != '') {
            params.set('salary_range', salaryRange);
        }

        if(dateOfJob != '') {
            params.set('date', dateOfJob);
        }

        if(contractType != '') {
            params.set('employment_term', contractType);
        }

        if(companyName != '') {
            params.set('company_name', companyName);
        }

        if(searchByTitle != '') {
            params.set('term', searchByTitle);
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
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/', options).map((response:Response) => response.json());
    }

    post(vacancy) {
        return this.http.post(Constants.API_ENDPOINT + 'vacancies/', JSON.stringify(vacancy) , this.jwt()).map((response:Response) => response.json());
    }

    update(user:User) {
        return this.http.put(Constants.API_ENDPOINT + 'vacancies/' + user.id, user, this.jwt()).map((response:Response) => response.json());
    }

    apply(id: number) {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + id + '/apply', this.jwt()).map((response:Response) => response.json());
    }

    deleteApply(id:number) {
        return this.http.delete(Constants.API_ENDPOINT + 'vacancies/' + id + '/apply', this.jwt()).map((response:Response) => response.json());
    }

    deleteApplicant(id:number, applicant_id:number) {
        return this.http.delete(Constants.API_ENDPOINT + 'vacancies/' + id + '/applicant/' + applicant_id, this.jwt()).map((response:Response) => response.json());
    }

    delete(id:number) {
        return this.http.delete(Constants.API_ENDPOINT + 'vacancies/' + id + '/', this.jwt()).map((response:Response) => response.json());
    }

    getAllApplications(applied = true) {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + "?applied=" + applied, this.jwt()).map((response:Response) => response.json());
    }

    associateProfileToVacancy(vacancyId, profileId) {
        return this.http.get(Constants.API_ENDPOINT + 'vacancies/' + vacancyId + '/associate/' + profileId, this.jwt()).map((response:Response) => response.json());
    }

    deleteAssociatedProfile(vacancyId, profileId) {
        return this.http.delete(Constants.API_ENDPOINT + 'vacancies/' + vacancyId + '/associate/' + profileId, this.jwt()).map((response:Response) => response.json());
    }

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