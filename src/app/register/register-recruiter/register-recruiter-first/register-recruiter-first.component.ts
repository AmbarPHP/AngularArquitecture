import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecruiterPersonalInformationService } from '../../../_services/recruiter/personal-info';

@Component({
    selector: 'register-recruiter-first',
    templateUrl: 'register-recruiter-first.component.html',
    styleUrls: ['register-recruiter-first.scss']
})

export class RegisterRecruiterFirstComponent {
    
    constructor(private fb: FormBuilder,
                private _personalInformationService: RecruiterPersonalInformationService) {}
    
    form: FormGroup;
    firstName: string;
    lastName: string;
    firstNameErrorMessage: boolean = false;
    lastNameErrorMessage: boolean= false;
    personalInformation: any;
    loading = true;
    profile_image: any;
    imageLoading: boolean = false;

    @Input()
    recruiterFirstStep: boolean;

    @Output()
    sendRecruiterFirstStepEvent: EventEmitter<any> = new EventEmitter()

    ngOnInit() {
        console.log("oninin")
        this.getPersonalInformation();
    }

    createForm() {
        this.form = this.fb.group({
            first_name: [this.personalInformation.first_name || '', Validators.required],
            last_name: [this.personalInformation.last_name || '', Validators.required],
        })
        this.loading = false;
    }
    
    getPersonalInformation() {
        this._personalInformationService.get().subscribe(res => {
            this.personalInformation = res;
            console.log(this.personalInformation);
            this.createForm();
        },
        err => {
            console.log(err);
        })
    }

    getPersonalInformationAfterLoadingPhoto() {
        this._personalInformationService.get().subscribe(res => {
            this.personalInformation = res;
            console.log(this.personalInformation);
        },
        err => {
            console.log(err);
        })        
    }

    sendRecruiterFirstStep() {
        if(!this.form.controls.first_name.value) {
            this.firstNameErrorMessage = true;
        }
        
        if(!this.form.controls.last_name.value) {
            this.lastNameErrorMessage = true;
        }

        if(this.form.valid) {
            this._personalInformationService.post(this.form.value).subscribe(res => {
                console.log(res);
                this.recruiterFirstStep = !this.recruiterFirstStep;
                this.sendRecruiterFirstStepEvent.emit(this.recruiterFirstStep);
            },
            err => {
                console.log(err);
            })
        }
    }

    fileChange(evt): void {
                this.imageLoading = true;
                const files = evt.target.files;
                if (files.length > 0) {
                    let file;
                    let formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        file = files[i];
                        formData.append('file', file, file.name);
                    }
                    this._personalInformationService.photo(formData).subscribe(res => {
                        this.firstName = this.personalInformation.first_name;
                        this.lastName = this.personalInformation.last_name;
                        this.getPersonalInformationAfterLoadingPhoto();
                        this.imageLoading = false;
                    }, err => {
                        console.log(err);
                        this.imageLoading = false;
                    })
                }
        
        
            }
}