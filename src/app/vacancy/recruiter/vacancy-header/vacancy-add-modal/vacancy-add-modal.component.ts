import { VacancyService } from '../../../../_services';
import { Vacancy } from './../../../../_models/vacancy';
import { CandidatePersonalInfoService, LocationService, AlertService } from '../../../../_services/index';
import { NgForm } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'vacancy-add-modal',
    templateUrl: 'vacancy-add-modal.component.html',
    styleUrls: ['vacancy-add-modal.scss']
})



export class VacancyAddModalComponent {
    search_skills:any = [];
    skills_list:any = [];
    
    constructor(private _vacancyService: VacancyService,
                private _locationService: LocationService,
                private _alertService: AlertService,
                private fb: FormBuilder) {
            this.skills_list = ['Python', '.Net', 'Java', 'Php'];
            
        }
        
        vacancy: any;
        countries: any;
        states: any;
        cities: any;
        languages: any = [];
        language_info_blank: any;
        newVacancyForm: FormGroup;
        vacancyError: boolean = false;
        msgs: any = [];


    @Output()
    sendSearchSkillsEvent: EventEmitter<any> =  new EventEmitter();

    @Output()
    sendSuccessSubmitEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit(){
        this.createForm();
        this.getAllCountries();
    }

    createForm() {
        this.newVacancyForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            position: ['', Validators.required],
            type: ['', Validators.required],
            country: [''],
            state: [''],
            city: [''],
            salary: [''],
            currency: [''],
            yoe: ['', Validators.required],
            education: ['', Validators.required],
            languages: this.fb.array([
                this.fb.group({
                    language: ['', Validators.required],
                    level: ['', Validators.required]
                })
            ]),
            skills: this.fb.array([
                this.fb.group({
                    id: [''],
                    value: ['', Validators.required],
                    vacancy: ['']
                })
            ]),
            status: ['', Validators.required],
            comments: ['', Validators.required]
        })

        console.log(this.newVacancyForm);
    }

    createLanguages() {
        const languages = [];
        for(let i = 0; i < this.vacancy[0].languages.length; i++) {
            languages.push(
                this.fb.group({
                    language: this.vacancy[0].languages[i].name,
                    level: this.vacancy[0].languages[i].level
                })
            )
        }
        return languages;
    }

    addLanguage() {
        const control = <FormArray>this.newVacancyForm.controls['languages'] as FormArray;
        control.push(
            this.fb.group({
                language: ['', Validators.required],
                level: ['', Validators.required]
            })
        );   
    }

    removeLanguage(index: number) {
        const control = <FormArray>this.newVacancyForm.controls['languages'];
        control.removeAt(index);
    }

    addSkill() {
        const control = <FormArray>this.newVacancyForm.controls['skills'] as FormArray;
        control.push(
            this.fb.group({
                id: '',
                value: ['', Validators.required],
                vacancy: ''
            })
        );   
    }

    removeSkill(index: number) {
        const control = <FormArray>this.newVacancyForm.controls['skills'];
        control.removeAt(index);
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
            this.vacancy.state = "";
            this. cities = [];
            this.vacancy.city = "";
        }
    }

    getCities(state) {
        if(state != "") {
            this._locationService.getCities(state).subscribe(res => {
                this.cities = res;
            })
        } else {
            this.cities = [];
            this.vacancy.city = "";
        }
    }

    sendSkillsList() {
        console.log(this.search_skills)
        this.sendSearchSkillsEvent.emit(this.search_skills);
    }

    submit(newVacancyForm) {
        if(newVacancyForm.salary == '') {
            newVacancyForm.salary = 0;
        } 

        this._vacancyService.post(newVacancyForm).subscribe(response => {
            this._alertService.success(response);
            let addModal = document.getElementById('addVacancyModal');
            $(addModal).scrollTop(0);
            console.log("Vacante creada");
            this.msgs = [];
            if(localStorage.getItem('userLanguage') == 'es') {
                this.msgs.push({ severity: 'info', summary: '', detail: 'Vacante creada exitosamente!' });
            } else {
                this.msgs.push({ severity: 'info', summary: '', detail: 'Vacancy created!' });
            }
            this.sendSuccessSubmitEvent.emit("nothing");
            setTimeout(() => {
                $(addModal).modal('toggle');
                this.createForm();
                this._alertService.clear();
            }, 2000)
        },
        error => {
            // this._alertService.errorAlert(error);
            this.vacancyError = true;
            setTimeout(() => {
                this.vacancyError = false;
            }, 4000);
            let addModal = document.getElementById('addVacancyModal');
            $(addModal).scrollTop(0);
        })
    }

    get newVacancyFormLanguages() {
        return <FormArray>this.newVacancyForm.get('languages');
    }

    get newVacancyFormSkills() {
        return <FormArray>this.newVacancyForm.get('skills');
    }

    get titleHasError() {
        const control = this.newVacancyForm.get('title');
        return control.hasError('required') && control.touched;
    }

    get positionHasError() {
        const control = this.newVacancyForm.get('position');
        return control.hasError('required') && control.touched;
    }

    get typeHasError() {
        const control = this.newVacancyForm.get('type');
        return control.hasError('required') && control.touched;
    }

    get yoeHasError() {
        const control = this.newVacancyForm.get('yoe');
        return control.hasError('required') && control.touched;
    }
    get educationHasError() {
        const control = this.newVacancyForm.get('education');
        return control.hasError('required') && control.touched;
    }

    get statusHasError() {
        const control = this.newVacancyForm.get('status');
        return control.hasError('required') && control.touched;
    }

    get commentsHasError() {
        const control = this.newVacancyForm.get('comments');
        return control.hasError('required') && control.touched;
    }
    
    languageHasError(index) {
        let control = this.newVacancyForm.get(`languages.${index}.language`);
        return control.hasError('required') && control.touched;
    }

    languageLevelHasError(index) {
        const control = this.newVacancyForm.get(`languages.${index}.level`);
        return control.hasError('required') && control.touched;
    }

    skillsHasError(index) {
        let control = this.newVacancyForm.get(`skills.${index}.value`);
        return control.hasError('required') && control.touched;
    }

}