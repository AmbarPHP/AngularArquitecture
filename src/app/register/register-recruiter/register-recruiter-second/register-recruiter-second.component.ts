import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterCompanyService } from '../../../_services/recruiter/company';

@Component({
    selector: 'register-recruiter-second',
    templateUrl: 'register-recruiter-second.component.html',
    styleUrls: ['register-recruiter-second.scss']
})

export class RegisterRecruiterSecondComponent {

    constructor(private router: Router,
                private fb: FormBuilder,
                private _companyService: RecruiterCompanyService) {}

    companyNameErrorMessage: boolean = false;
    loading = true;
    companyInformation: any = [{id: '', name: '', avatar: ''}];
    imageLoading: boolean = false;

    form: FormGroup;

    @Input()
    recruiterFirstStep: boolean;

    @Output()
    sendRecruiterFirstStepEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.getCompanyInformation();
    }

    goBack() {
        this.recruiterFirstStep = true;
        this.sendRecruiterFirstStepEvent.emit(this.recruiterFirstStep);
    }

    getCompanyInformation() {
        this._companyService.get().subscribe(res => {
            if (res.length > 0) {
                this.companyInformation = res;
            }
            this.createForm();
        },
        err => {
            console.log(err);
        });
    }

    getCompanyInformationAfterLoadingPhoto() {
        this._companyService.get().subscribe(res => {
            console.log(res);
            this.companyInformation = res;
        },
        err => {
            console.log(err);
        });
    }

    createForm() {
        if (this.companyInformation[0]) {
            this.form = this.fb.group({
                id: [this.companyInformation[0].id],
                name: [this.companyInformation[0].name, Validators.required]
            });
        }else {
            this.form = this.fb.group({
                id: [],
                name: []
            });
        }
        this.loading = false;
    }

    completeRegisterRecruiter() {
        if (this.form.controls.name.value) {
            // this.router.navigateByUrl('landing');
            this._companyService.post(this.form.value).subscribe(res => {
                this.router.navigate(['/profiles']);
            },
            err => {
                console.log(err);
            });
        } else {
            this.companyNameErrorMessage = true;
        }
    }

    fileChange(evt): void {
        this.imageLoading = true;
        const files = evt.target.files;
        if (files.length > 0) {
            let file;
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                formData.append('file', file, file.name);
            }
            this._companyService.photo(formData).subscribe(res => {
                this.getCompanyInformationAfterLoadingPhoto();
                this.imageLoading = false;
            }, err => {
                console.log(err);
                this.imageLoading = false;
            });
        }
    }

    get companyAvatar() {
        if (this.companyInformation[0]) {
            return this.companyInformation[0].avatar;
        } else {
            return '';
        }
    }
}
