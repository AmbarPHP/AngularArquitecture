import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecruiterPersonalInformationService } from '../../../_services/recruiter/personal-info';
import { RecruiterCompanyService } from '../../../_services/recruiter/company';

@Component({
    selector: 'my-account-recruiter-information',
    templateUrl: 'my-account-recruiter-information.component.html',
    styleUrls: ['my-account-recruiter-information.scss']
})

export class MyAccountRecruiterInformationComponent {

    constructor(private fb: FormBuilder,
                private _recruiterPersonalInformationService: RecruiterPersonalInformationService,
                private _recruiterCompanyService: RecruiterCompanyService) {
    }

    @Output()
    sendLoading: EventEmitter<any> = new EventEmitter<any>();

    userInformation: any;
    companyInformation: any = [{
        id: '',
        name: ''
    }];

    loading = true;
    formInformation: FormGroup;

    updateInformationError = false;
    updateInformationSuccess = false;
    imageLoading = false;
    imageCompanyLoading = false;
    companyPhoto: any;

    ngOnInit() {
        this.getRecruiterInformation();
    }

    getRecruiterInformation() {
        this._recruiterPersonalInformationService.get().subscribe(res => {
            this.userInformation = res;
            this.getRecruiterCompany();
        });
    }

    getRecruiterCompany() {
        this._recruiterCompanyService.get().subscribe(res => {
            this.companyInformation = res;
            this.createForm();
            this.loading = false;
            if (this.companyInformation[0]) {
                this.companyPhoto = this.companyInformation[0].avatar;
            }
        });
    }

    createForm() {
        let company_name = '';
        let company_id = '';

        if (this.companyInformation[0]) {
            company_name = this.companyInformation[0].name;
            company_id = this.companyInformation[0].id;
        }

        this.formInformation = this.fb.group({
            first_name: [this.userInformation.first_name || ''],
            last_name: [this.userInformation.last_name || ''],
            reference_code: [this.userInformation.reference_code || ''],
            company_name: [company_name],
            company_id: [company_id]
        });
    }

    updateInformation() {
        // console.log("resUpdate")
        // tslint:disable-next-line:max-line-length
        this._recruiterPersonalInformationService.post({first_name: this.formInformation.value.first_name, last_name: this.formInformation.value.last_name}).subscribe(res => {
            console.log('res update', res);
            this.updateInformationError = false;
            this.updateInformationSuccess = true;
        }, err => {
            this.updateInformationError = true;
            this.updateInformationSuccess = false;
        });

        // tslint:disable-next-line:max-line-length
        this._recruiterCompanyService.post({id: this.formInformation.value.company_id, name: this.formInformation.value.company_name}).subscribe(res => {
            console.log('company', res);
        });
    }

    getPersonalInformationAfterLoadingPhoto() {
        this._recruiterPersonalInformationService.get().subscribe(res => {
            this.userInformation = res;
        },
        err => {
            console.log(err);
        });
    }

    getCompanyInformationAfterLoadingPhoto() {
        this._recruiterCompanyService.get().subscribe(res => {
            console.log("After", res);
            this.companyPhoto = res[0].avatar;
        }, err => {
            console.log("Error", err);
        })
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
            this._recruiterPersonalInformationService.photo(formData).subscribe(res => {
                this.getPersonalInformationAfterLoadingPhoto();
                this.imageLoading = false;
                console.log('res', res);
            }, err => {
                console.log(err);
                this.imageLoading = false;
            });
        }


    }

    fileChangeCompany(evt): void {
        this.imageCompanyLoading = true;
        const files = evt.target.files;
        if (files.length > 0) {
            let file;
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                file = files[i];
                formData.append('file', file, file.name);
            }
            this._recruiterCompanyService.photo(formData).subscribe(res => {
                this.getCompanyInformationAfterLoadingPhoto();
                console.log(res);
                this.imageCompanyLoading = false;
            }, err => {
                console.log(err);
                this.imageCompanyLoading = false;
            });
        }
    }

    shareTwitter() {
        window.open(`https://twitter.com/intent/tweet?text=https://app.zourcing.com/%23/login?${this.userInformation.reference_code}`, '_blank');
    }

    shareFacebook(postingTitle, jobDescription, country, vacancyId) {
        let referenceUrl = `https%3A%2F%2Fapp.zourcing.com%2F%23%2Flogin?reference-code=${this.userInformation.reference_code}`;
        let vacancyUrl = `https%3A%2F%2Fapp.zourcing.com%2F%23%2Flogin%2F`;
        // let vacancyInformation = `New Zourcing Vacancy! ${postingTitle}, ${jobDescription} in ${country} - More information about this vacancy in ${zourcingVacancy}`
        window.open(`https://www.facebook.com/dialog/share?app_id=1099303473510587&quote=${referenceUrl}&display=popup&href=${vacancyUrl}&redirect_uri=${vacancyUrl}`, '_blank');
    }
}
