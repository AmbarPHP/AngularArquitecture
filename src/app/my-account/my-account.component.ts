import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CandidateWorkExperienceService, CandidateSkillsService, CandidateLanguageService, CandidateConctactInfoService, LocationService } from '../_services/index';
import { RecruiterPersonalInformationService } from '../_services/recruiter/personal-info';
import {  RecruiterCompanyService } from '../_services/recruiter/company';
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';
import { MembershipService } from '../_services/membership.service';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'my-account',
    templateUrl: 'my-account.component.html',
    styleUrls: ['my-account.scss']
})

export class MyAccountComponent {
    constructor(private _as: AuthenticationService, 
                private _router: Router,
                private _candidateWorkExperienceService: CandidateWorkExperienceService,
                private _candidateSkillsService: CandidateSkillsService,
                private _candidateLanguageService: CandidateLanguageService,
                private _candidateContactInfoService: CandidateConctactInfoService,
                private _recruiterPersonalInformationService: RecruiterPersonalInformationService,
                private _recruiterCompanyService: RecruiterCompanyService,
                private _locationService: LocationService,
                private _mixpanelTrackerService: mixpanelTrackerService,
                private _membershipService: MembershipService,
                private _userService: UserService) {}
    isRecruiter: boolean;
    // isRecruiterInformation: boolean = true;
    candidateMenuSelected: string = "information";
    user: any;
    userInformation: any;
    loading: boolean = true;

    // This state could be: 'information', 'preferences' or 'payment'
    myAccountRecruiterState: any = 'information';

    membershipState: boolean;
    memberships: any;

    paymentMethodState: boolean = false;

    /* Candidate Information Variables */
    countries: any;
    states: any;
    cities: any;

    /* end of Candidate information Variables */
    candidateInformation = [
        {
            candidatePersonalInformation: null,
            candidateEducation: null,
            candidateWorkExperience: null,
            candidateSkills: null,
            candidateLanguage: null,
            candidateContactInfo: null
        }
    ];

    changePasswordError: boolean = false;
    changePasswordSuccess: boolean = false;

    ngOnInit() {
        // If user is not logged in can not access to the account page
        if(this._as.isLoggedIn()) {
            this.user = this._as.getUser();
            console.log("user", this.user);
            // console.log(this.user);
            console.log(this.user)
            this.getAccountType();
            this._mixpanelTrackerService.sendVisitedPage('My Account');
            this.getMembershipState();
        } else {
            this._router.navigate(['/login'])
        }
    }

    getAccountType() {
        console.log("tyoe", this.user.type);
        if(this.user.type === "recruiter" || this.user.type === "r") {
            this.isRecruiter = true;
            this.loading = false;
            this.getMemberships();
        } else {
            this.isRecruiter = false;
            this.getAllCandidateInformation();
        }
    }

    getAllCandidateInformation() {
        
        this._candidateContactInfoService.get().subscribe(response => {
            this.candidateInformation[0].candidateContactInfo = response;
            this.loading = false;
            console.log(this.candidateInformation[0]);
        })

    }

    getRecruiterInformation() {
        this._recruiterPersonalInformationService.get().subscribe(res => {
            console.log("response", res)
            this.userInformation = res;
            this.loading = false;
        })
    }

    getRecruiterCompany() {
        this._recruiterCompanyService.get().subscribe(res => {
            console.log("cpmpany response", res)
        })
    }

    getLocationCountry(event) {
        this._locationService.getStates(event).subscribe(res => {
            this.states = res;
        })
    }

    getLocationState(event) {
        this._locationService.getCities(event).subscribe(res => {
            this.cities = res;
        })
    }

    getLoading(event) {
        this.loading = event;
    }

    getMembershipState() {
        this.membershipState = this._recruiterPersonalInformationService.membershipState;
        if(this.membershipState) {
            this.myAccountRecruiterState = null;
        }
    }
    getMembershipStateEvent() {
        this.membershipState = true;
        this.myAccountRecruiterState = null;
    }

    getMemberships() {
        this._membershipService.getMemberships().subscribe(res => {
            this.memberships = res;
            this.memberships[0].sort((a, b) => {
                return a.id - b.id;
            })

        })
    }

    getPaymentMethodState(event) {
        this.paymentMethodState = event;
        this.myAccountRecruiterState = null;
        this.membershipState = false;
    }

    getMyAccountRecruiterStateEvent(event) {
        this.membershipState = false;
        this.myAccountRecruiterState = event;
    }

    getChangePassword(event) {
        this._userService.changePassword(event.old_password, event.new_password).subscribe(res => {
            console.log("Res", res)
            this.changePasswordSuccess = true;
            setTimeout(() => {
                this.changePasswordSuccess = false;
            }, 3000);
        }, err => {
            console.log("Error", err);
            this.changePasswordError = true;
            setTimeout(() => {
                this.changePasswordError = false;
            }, 3000);
        })
    }
}