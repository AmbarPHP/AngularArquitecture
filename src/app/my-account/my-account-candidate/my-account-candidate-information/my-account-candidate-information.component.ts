import { Component, Input } from '@angular/core';
import { CandidatePersonalInfoService, LocationService, AlertService, AuthenticationService } from '../../../_services/index';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'my-account-candidate-information',
    templateUrl: 'my-account-candidate-information.component.html',
    styleUrls: ['my-account-candidate-information.scss']
})

export class MyAccountCandidateInformationComponent {

    constructor(private _candidatePersonalInformationService: CandidatePersonalInfoService,
                private _locationService: LocationService,
                private _alertService: AlertService,
                private _authenticationService: AuthenticationService) {}

    personalInformation: any;

    countries: any;
    states: any;
    cities: any;
    profile_image: string;
    resume: any;
    pk: any;
    msgs: any = [];

    ngOnInit() {
        this._candidatePersonalInformationService.get().subscribe(res => {
            this.personalInformation = res;
            this.profile_image = res.profile_picture;
            if(this.personalInformation.country != "") {
                this.getAllCountries();
                if(this.personalInformation.state != "") {
                    this.getStates(this.personalInformation.country);
                    if(this.personalInformation.city != "") {
                        this.getCities(this.personalInformation.state);
                    }
                }
            }
        })

        this.getAllCountries();
    }

    updatePersonalInformation(form) {
        this._candidatePersonalInformationService.post(form).subscribe(response => {
            this._alertService.success(response);
        },
        error => {
            console.log(error);
        })
    }

    getAllCountries() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countries = res;
        })
    }

    getStates(country) {
        if(country != "") {
            this._locationService.getStates(country).subscribe(res => {
                this.states = res;
            })
        } else {
            this.states = [];
            this.personalInformation.state = "";
            this. cities = [];
            this.personalInformation.city = "";
        }
    }

    getCities(state) {
        if(state != "") {
            this._locationService.getCities(state).subscribe(res => {
                this.cities = res;
            })
        } else {
            this.cities = [];
            this.personalInformation.city = "";
        }
    }

    fileChange(evt): void {
        
                const files = evt.target.files;
                if (files.length > 0) {
                    let file;
                    let formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        file = files[i];
                        formData.append('file', file, file.name);
                    }
                    this._candidatePersonalInformationService.photo(formData).subscribe(res => {
                        this._candidatePersonalInformationService.get().subscribe(response => {
                            this.profile_image = response.profile_picture;
                        })
                    }, err => {
                        console.log(err);
                    })
                }
        
        
            }

    resumeChange(evt) {
        const files = evt.target.files;
        if (files.length > 0) {
            let file;
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                formData.append('file', file, file.name);
            }
            this.resume = formData;
            this._authenticationService.me().subscribe(res => {
                this.pk = res.profile_id
                this._candidatePersonalInformationService.resume(this.resume, this.pk).subscribe(res => {
                    console.log("resume", res)
                    this.msgs = [];
                    this.msgs.push({ severity: 'info', summary: '', detail: 'Has subido tu CV.' });
                })
            })
        }


    }

}