import { Component } from '@angular/core';
import { IframeService } from '../../_services/iframe.service';
import { PagerService } from '../../_services/pager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { CandidatePersonalInfoService } from '../../_services/candidate/personal-info';
import { CandidateConctactInfoService } from '../../_services/candidate/contact-info';
import { CartService } from '../../_services/cart.service';
import { VacancyService } from '../../_services/vacancy.service';
import { CandidateWorkExperienceService } from '../../_services/candidate/work-experience';
import { Vacancy } from '../../_models/index';
import { VacancyFilterPipe } from '../../_pipes/filterpipe.component';
// import { settings } from 'cluster';

@Component({
    selector: 'iframe-vacancies',
    templateUrl: 'iframe-vacancies.component.html',
    styleUrls: ['iframe-vacancies.scss'],
    providers: [VacancyFilterPipe]
})

export class IframeVacanciesComponent {

    constructor(private _iframeService: IframeService,
                private _pagerService: PagerService,
                private fb: FormBuilder,
                private _authentificationService: AuthenticationService,
                private _userService: UserService,
                private _personalInformationService: CandidatePersonalInfoService,
                private _contactInformationService: CandidateConctactInfoService,
                private _cartService: CartService,
                private _vacancyService: VacancyService,
                private _workExperience: CandidateWorkExperienceService,
                private vacancyFilter: VacancyFilterPipe) {}

    vacancies: any;
    vacanciesToBeFiltered: any;
    pagination: any;
    pagedItems: any;
    form: FormGroup;
    emailHasSuccess: any;
    currentUser: any;
    cart_id: any;
    msgs: any = [];
    pk: any;
    resume: any;
    vacancyDetail: any = [];
    term: string = "";
    invalidFormat: boolean = false;
    
    ngOnInit() {
        this.createForm();
        this._iframeService.iframeView$.next(true);
        this.getVacancies();
    }
    
    getVacancies() {    
        console.log("get Vacancies");    
        this._iframeService.getVacancies().subscribe(res => {
            this.vacancies = res;
            this.vacanciesToBeFiltered = res;
            this.getPagination();
            this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        });
    }

    createForm() {
        this.form = this.fb.group({
            email: [this._iframeService.email, Validators.email],
            phone: ['', Validators.required],
            first_name: ['', Validators.required],
            how_know: [''],
            last_name: ['', Validators.required],
            // country: ['', Validators.required],
            title: ['', Validators.required],
            facebook: [''],
            linkedin: [''],
            twitter: [''],
            github: [''],
            skype: [''],
            skill: [''],
            experience: [''],
        });
    }

    search(value) {
        this.term = value;
        this.vacancies = this.vacancyFilter.transform(this.vacanciesToBeFiltered, this.term);
        this.getPagination();
        this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    }

    getPagination() {
        this.pagination = this._pagerService.getPager(this.vacancies.length, 1, 10);
    }

    getPagedItems(event){
        this.pagedItems = event;
    }

    applyNow(id) {
        this._iframeService.vacancyId = id;
        console.log(this._iframeService.vacancyId);
        $('#iframeModal').modal({
            backdrop: 'static'
        });
    }

    applyNowFromVacancyModal(id) {
        this._iframeService.vacancyId = id;
        $('#vacancyModal').modal('hide');
        setTimeout(() => {
            $('#iframeModal').modal({
                backdrop: 'static'
            });
        }, 400);
    }

    register() {
        let user = {
            id: '',
            type: 'candidate',
            username: this.form.controls['email'].value,
            password: '123456',
            phone: '',
            email: '',
            firstName: '',
            description: '',
            lastName: '',
            picture: '',
            token: '',
            social_id: '',
            social_token: '',
            cart_id: '',
        };
        if (this._authentificationService.isLoggedIn()) {
            this._authentificationService.logout();
            this.emailHasSuccess = false;
        }
        this._userService.create(user)
            .subscribe(
            data => {
                this.login();
            },
            error => {
                console.log(error);
                // console.log(JSON.parse(error._body).username[0])
                if (JSON.parse(error._body).username[0] === `Usuario con correo ${this.form.controls['email'].value} ya existente`) {
                    console.log('Error correcto');
                    this._iframeService.emailHasSuccess = true;
                    this.emailHasSuccess = this._iframeService.emailHasSuccess;
                    if (this._authentificationService.isLoggedIn()) {
                        this._authentificationService.logout();
                    }
                    this.loginWhenUserAlreadyExists();
                } else {
                    this._iframeService.emailHasSuccess = false;
                    this.emailHasSuccess = this._iframeService.emailHasSuccess;
                    this.form.controls['first_name'].setValue('');
                    this.form.controls['last_name'].setValue('');
                    // this.form.controls['country'].setValue('');
                    this.form.controls['title'].setValue('');
                    this.form.controls['phone'].setValue('');
                }
            });
    }

    login() {
        this._authentificationService.login(this.form.controls['email'].value, '123456')
            .subscribe(
            data => {
                this._authentificationService.me().subscribe(data => {
                    this.pk = data.profile_id;
                    console.log('pk', this.pk);
                    let user = this._authentificationService.getUser();
                    user.id = data.id;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    let personalInformation = {
                        first_name: this.form.controls['first_name'].value,
                        last_name: this.form.controls['last_name'].value,
                        title: this.form.controls['title'].value,
                    };
                    let contactInformation = {
                        email: this.form.controls['email'].value,
                        facebook_url: this.form.controls['facebook'].value,
                        github_url: this.form.controls['github'].value,
                        linkedin_url: this.form.controls['linkedin'].value,
                        phone: this.form.controls['phone'].value,
                        skype_url: this.form.controls['skype'].value,
                    };
                    let workExperience = [{
                        currently_working: false,
                        from_date: '',
                        id: '',
                        name: '',
                        no_work_experience: false,
                        position: '',
                        rate: '',
                        responsabilities: this.form.controls['skill'].value + ' ' + 'Years of experiece in IT: ' + this.form.controls['experience'].value,
                        to_date: '',
                    }];
                    this._personalInformationService.post(personalInformation).subscribe(res => {
                        this.apply();
                    });
                    this._contactInformationService.post(contactInformation).subscribe(res => {
                        console.log('contact information');
                    });
                    if ( this.form.controls['skill'].value != '' ||  this.form.controls['experience'].value != '') {
                        this._workExperience.post(workExperience).subscribe(res => {
                            console.log('work experience')
                        });
                    }
                    if (this.resume) {
                        this._personalInformationService.resume(this.resume, this.pk).subscribe(res => {
                            console.log('resume', res)
                        });
                    }
                    this.createCart();
                });

            },
            error => {
                console.log(error);
            });
    }

    loginWhenUserAlreadyExists() {
        // this.loading = true;
        this._authentificationService.login(this.form.controls['email'].value, '123456')
            .subscribe(
            data => {
                this._authentificationService.me().subscribe(data => {
                    this.pk = data.profile_id;
                    let user = this._authentificationService.getUser();
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    let personalInformation = {
                        first_name: this.form.controls['first_name'].value,
                        last_name: this.form.controls['last_name'].value,
                        title: this.form.controls['title'].value,
                    };
                    let contactInformation = {
                        email: this.form.controls['email'].value,
                        facebook_url: this.form.controls['facebook'].value,
                        github_url: this.form.controls['github'].value,
                        linkedin_url: this.form.controls['linkedin'].value,
                        phone: this.form.controls['phone'].value,
                        skype_url: this.form.controls['skype'].value,
                    };
                    let workExperience = [{
                        currently_working: false,
                        from_date: '',
                        id: '',
                        name: '',
                        no_work_experience: false,
                        position: '',
                        rate: '',
                        responsabilities: this.form.controls['skill'].value + ' ' + 'Years of experiece in IT: ' + this.form.controls['experience'].value,
                        to_date: '',
                    }];
                    this._personalInformationService.post(personalInformation).subscribe(res => {
                        console.log('Apply alreadyexist');
                        this.apply();
                    });
                    this._contactInformationService.post(contactInformation).subscribe(res => {
                        console.log('contact information');
                    });
                    if ( this.form.controls['skill'].value != '' ||  this.form.controls['experience'].value != '') {
                        this._workExperience.post(workExperience).subscribe(res => {
                            console.log('work experience');
                        });
                    }
                    if (this.resume) {
                        this._personalInformationService.resume(this.resume, this.pk).subscribe(res => {
                            console.log('resume', res);
                        });
                    }
                    this.createCart();
                });

            },
            error => {
                console.log('Intentar con otro correo', error);
                // this.loading = false;
            });
    }

    createCart() {

        this.currentUser = this._authentificationService.getUser();
        this.cart_id = this.currentUser.cart_id;

        if (this.cart_id == '' || this.cart_id == null) {
            this._cartService.createCart().subscribe(cart => {
                this.cart_id = cart.id;
                this._cartService.setCart(this.currentUser, cart.id);
                this._cartService.cartLoaded.emit(true);

            },
                error => {
                    console.log(error);
                });
        } else {
            return this.cart_id;
        }
    }

    apply() {

        this._vacancyService.apply(this._iframeService.vacancyId).subscribe(res => {
            console.log('apply!', res);
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: '', detail: 'Has aplicado a la vacante exitosamente.' });
            setTimeout(() => {
                $('#iframeModal').modal('hide');
                this._authentificationService.logout();
                this.form.reset();
            }, 300);
        },
        err => {
            console.log(err);
        });
    }

    fileChange(evt) {
        const files = evt.target.files;
        // console.log("file", files)
        if (files[0].type === 'application/zip' || files[0].type === 'application/pdf' || files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            // console.log("formato valido")
            if (files.length > 0) {
                let file;
                const formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                    file = files[i];
                    formData.append('file', file, file.name);
                }
                this.resume = formData;
                this.invalidFormat = false;
            }
        } else {
            // console.log("formato invalido, seleccionar otro archivo (pdf, zip, word o excel)")
            this.invalidFormat = true;
        }


    }

    resetForm() {
        this.form.reset();
    }

    openVacancyModal(id) {
        console.log('id', id);
        $('#vacancyModal').modal({
            backdrop: 'static'
        });

        // this._vacancyService.get(id).subscribe(res => {
        //     this.vacancyDetail = res;
        //     console.log(this.vacancyDetail);
        // })

        this.vacancyDetail = this.vacancies.filter(vacancy => {
            return vacancy.id == id;
        });

        console.log('vacancyDe', this.vacancyDetail);
    }

    cleanVacancy() {
        this.vacancyDetail = [];
    }

    get emailHasError() {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
    }

    get phoneHasError() {
        const control = this.form.get('phone');
        return control.hasError('required') && control.touched;
    }

    get firstnameHasError() {
        const control = this.form.get('first_name');
        return control.hasError('required') && control.touched;
    }

    get lastnameHasError() {
        const control = this.form.get('last_name');
        return control.hasError('required') && control.touched;
    }

    // get countryHasError() {
    //     const control = this.form.get('country');
    //     return control.hasError('required') && control.touched;
    // }

    get titleHasError() {
        const control = this.form.get('title');
        return control.hasError('required') && control.touched;
    }
}
