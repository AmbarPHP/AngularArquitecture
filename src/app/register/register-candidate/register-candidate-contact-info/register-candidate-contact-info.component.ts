import { CandidateConctactInfoService } from './../../../_services/candidate/contact-info';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'register-candidate-contact-info',
    templateUrl: 'register-candidate-contact-info.component.html',
    styleUrls: ['register-candidate-contact-info.scss']
})

export class RegisterCandidateContactInfoComponent {
    contactinfo: any;

    constructor(private router: Router,
                private contactInfoService: CandidateConctactInfoService,
                private fb: FormBuilder) {

    }
    previousStep: number = 5;
    contactForm: FormGroup;
    loading: boolean = false;

    @Output()
    sendPreviousPageEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        // this.contactinfo = new CandidateContactInfoModel('','','','','','')
        this.loading = true;
        this.contactInfoService.get().subscribe((data) => {
            console.log("contact info", data);
            this.contactinfo = data;
            this.createForm();
            this.loading = false;
        }, err => {
            console.log(err);
            this.loading = false;
        });
    }

    createForm() {
        this.contactForm = this.fb.group({
            email: [this.contactinfo.email || '', Validators.email],
            phone: [this.contactinfo.phone || '', Validators.required],
            linkedin_url: [this.contactinfo.linkedin_url || ''],
            facebook_url: [this.contactinfo.facebook_url || ''],
            github_url: [this.contactinfo.github_url || ''],
            skype_url: [this.contactinfo.skype_url || ''],
        })
    }


    nextPage() {
        console.log(this.contactinfo)
        this.contactInfoService.post(this.contactForm.value).subscribe(res => {
            console.log("Exito", res);
            this.router.navigateByUrl('vacancies-candidate');
        }, err => {
            console.log(err);
        });
    }

    previousPage() {
        this.sendPreviousPageEvent.emit(this.previousStep);
    }

    skip() {
        this.router.navigate(['/vacancies-candidate']);
    }

    get emailHasError() {
        const control = this.contactForm.get(`email`);
        return control.hasError('email') && control.touched;
    }

    get phoneHasError() {
        const control = this.contactForm.get(`phone`);
        return control.hasError('phone') && control.touched;
    }
}
