import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CandidatePersonalInfoService } from '../../../_services/candidate/personal-info'
import { AuthenticationService } from '../../../_services/authentication.service';
import { LocationService } from '../../../_services/location.service';
import { UserService } from '../../../_services/user.service';

@Component({
    selector: 'register-candidate-personal',
    templateUrl: 'register-candidate-personal.component.html',
    styleUrls: ['register-candidate-personal.component.scss']
})

export class RegisterCandidatePersonalComponent {
    personal_info: any;
    profile_image: string;
    resume: any;
    pk: any;
    msgs: any = [];
    countries: any = [];
    states: any = [];
    cities: any = [];
    loading = false;
    resumeLoading = false;
    pictureLoading = false;

    constructor(private personalInfoService: CandidatePersonalInfoService,
                private _authenticationService: AuthenticationService,
                private fb: FormBuilder,
                private _locationService: LocationService,
                private _userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.personalInfoService.get().subscribe(res => {
            console.log("personal", res)
            this.personal_info = res;
            this.profile_image = res.profile_picture;
            if(this.personal_info.country != "") {
                this.getStates(this.personal_info.country);
                if(this.personal_info.state != "") {
                    this.getCities(this.personal_info.state);
                }
            }
            this.createForm();
            this.loading = false;
        }, err => {
            console.log("err", err);
            this.createForm();
        })
        this.getCountries();

    }

    nextStep: number = 2;
    personalForm: FormGroup;

    @Output()
    sendNextPageEvent: EventEmitter<any> = new EventEmitter();

    createForm() {
        this.personalForm = this.fb.group({
            first_name: [this.personal_info.first_name || this._userService.candidateFromEmailData.name || '', Validators.required],
            last_name: [this.personal_info.last_name || '', Validators.required],
            country: [this.personal_info.country || '', Validators.required],
            state: [this.personal_info.state || '', Validators.required],
            city: [this.personal_info.city || '', Validators.required],
            title: [this.personal_info.title || '', Validators.required]
        })
    }

    getCountries() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countries = res;
            console.log("countries", this.countries);
        })
    }

    getStates(countryValue) {
        if(countryValue == "") {
            this.states = [];
            this.cities = [];
        } else {
            this._locationService.getStates(countryValue).subscribe(res => {
                this.states = res;
                console.log("states", this.states);
            })
        }
    }

    getCities(stateValue) {
        if(stateValue == "") {
            this.cities = []
        } else {
            this._locationService.getCities(stateValue).subscribe(res => {
                this.cities = res;
                console.log("cities", this.cities);
            })
        }
    }


    fileChange(evt): void {

        const files = evt.target.files;
        if (files.length > 0) {
            this.pictureLoading = true
            let file;
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                formData.append('file', file, file.name);
            }
            $('#imageModal').modal({
                backdrop: 'strict'
            })
            this.personalInfoService.photo(formData).subscribe(res => {
                console.log("exito", res);
                this.pictureLoading = false;
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: '', detail: 'Imagen subida exitosamente!' });
                this.personalInfoService.get().subscribe(response => {
                    this.profile_image = response.profile_picture;
                    $('#imageModal').modal('hide');
                })
            }, err => {
                console.log(err);
                $('#imageModal').modal('hide');
                this.pictureLoading = false;
            })
        }


    }

    nextPage(form) {
        this.personalInfoService.post(form).subscribe(res => {
            this.sendNextPageEvent.emit(this.nextStep)
        }, err => {
            console.log(err)
        })
    }

    resumeChange(evt) {
        const files = evt.target.files;
        if (files.length > 0) {
            this.resumeLoading = true;
            let file;
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                formData.append('file', file, file.name);
            }

            this.resume = formData;
            $('#resumeModal').modal({
                backdrop: 'strict'
            })
            this._authenticationService.me().subscribe(res => {
                this.pk = res.profile_id
                this.personalInfoService.resume(this.resume, this.pk).subscribe(res => {
                    console.log("resume", res)
                    $('#resumeModal').modal('hide');
                    this.resumeLoading = false;
                    this.msgs = [];
                    this.msgs.push({ severity: 'info', summary: '', detail: 'Has subido tu CV.' });
                }, err => {
                    console.log("err", err);
                    $('#imageModal').modal('hide');
                    this.resumeLoading = false;
                })
            })
        }


    }

    removeSpaces(inputValue, formController) {
        // console.log("test", inputValue);
        
        const value = inputValue.value.trim();
        console.log('test', value)
        this.personalForm.get(formController).setValue(value)
    }

    get firstNameHasError() {
        const control = this.personalForm.get('first_name');
        return control.hasError('required') && control.touched;
    }

    get lastNameHasError() {
        const control = this.personalForm.get('last_name');
        return control.hasError('required') && control.touched;
    }

    get countryHasError() {
        const control = this.personalForm.get('country');
        return control.hasError('required') && control.touched;
    }

    get stateHasError() {
        const control = this.personalForm.get('state');
        return control.hasError('required') && control.touched;
    }

    get cityHasError() {
        const control = this.personalForm.get('city');
        return control.hasError('required') && control.touched;
    }

    get titleHasError() {
        const control = this.personalForm.get('title');
        return control.hasError('required') && control.touched;
    }
}

