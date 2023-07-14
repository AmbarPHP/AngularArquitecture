import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, FormGroupName, FormControlName, FormArrayName , Validators} from '@angular/forms';
import { LocationService } from '../../../../../_services/location.service';
import { VacancyService } from '../../../../../_services/vacancy.service';
import { AlertService } from '../../../../../_services/alert.service';

@Component({
    selector: 'vacancy-detail-edit-modal',
    templateUrl: 'vacancy-detail-edit-modal.component.html',
    styleUrls: ['vacancy-detail-edit-modal.scss']
})

export class VacancyDetailEditModalComponent {

    constructor(private fb: FormBuilder,
                private _locationService: LocationService,
                private _vacancyService: VacancyService,
                private _alertService: AlertService) {}

    @Input()
    vacancy: any;

    @Output()
    sendVacancyEditedEvent: EventEmitter<any> = new EventEmitter();

    editForm: FormGroup;
    countries: any;
    states: any;
    cities: any;

    ngOnInit() {
        this.createForm();
        this.getCountriesOfVacancy();
        console.log(this.editForm)
    }

    createForm() {
        this.editForm = this.fb.group({
            id: this.vacancy[0].id,
            title: [this.vacancy[0].posting_title, Validators.required],
            position: [this.vacancy[0].job_description, Validators.required],
            type: [this.vacancy[0].employment_term_id, Validators.required],
            country: this.vacancy[0].country_id,
            state: this.vacancy[0].state_id,
            city: this.vacancy[0].city_id,
            salary: this.vacancy[0].salary,
            currency: this.vacancy[0].currency_id,
            yoe: [Math.round(this.vacancy[0].yoe), Validators.required],
            education: [this.vacancy[0].education, Validators.required],
            languages: this.fb.array(
                this.createLanguages()
            ),
            skills: this.fb.array(
                this.createSkills()
            ),
            comments: [this.vacancy[0].comments, Validators.required],
            status: [this.vacancy[0].status, Validators.required]
        })
    }
    

    createLanguages() {
        const languages = [];
        for(let i = 0; i < this.vacancy[0].languages.length; i++) {
            languages.push(
                this.fb.group({
                    language: [this.vacancy[0].languages[i].name, Validators.required],
                    level: [this.vacancy[0].languages[i].level, Validators.required]
                })
            )
        }
        return languages;
    }

    addLanguage() {
        const control = <FormArray>this.editForm.controls['languages'] as FormArray;
        control.push(
            this.fb.group({
                language: ['', Validators.required],
                level: ['', Validators.required]
            })
        );   
    }

    removeLanguage(index: number) {
        const control = <FormArray>this.editForm.controls['languages'];
        control.removeAt(index);
    }

    createSkills() {
        const skills = [];
        for(let i = 0; i < this.vacancy[0].skills.length; i++) {
            skills.push(
                this.fb.group({
                    id: this.vacancy[0].skills[i].id,
                    value: [this.vacancy[0].skills[i].pd_skill, Validators.required],
                    vacancy: this.vacancy[0].skills[i].vacancy
                })
            )
        }
        return skills;
    }

    addSkill() {
        const control = <FormArray>this.editForm.controls['skills'] as FormArray;
        control.push(
            this.fb.group({
                id: '',
                value: ['', Validators.required],
                vacancy: ''
            })
        );   
    }

    removeSkill(index: number) {
        const control = <FormArray>this.editForm.controls['skills'];
        control.removeAt(index);
    }

    getCountriesOfVacancy() {
        if(this.vacancy[0].country != "") {
            this.getAllCountries();
            if(this.vacancy[0].state != "") {
                this.getStates(this.vacancy[0].country_id);
                if(this.vacancy[0].cities != "") {
                    this.getCities(this.vacancy[0].state_id);
                }
            }
        }
    }

    getAllCountries() {
        this._locationService.getAllCountries().subscribe(res => {
            this.countries = res;
            console.log(this.countries);
        })
    }

    getStates(countryId) {
        if(countryId != "") {
            this._locationService.getStates(countryId).subscribe(res => {
                this.states = res;
                console.log(this.states);
            })
        } else {
            this.editForm.controls['state'].setValue("");
            this.states = [];
            this.editForm.controls['city'].setValue("");
            this.cities = [];
        }
    }

    getCities(stateId) {
        if(stateId != "") {
            this._locationService.getCities(stateId).subscribe(res => {
                this.cities = res;
                console.log(this.cities);
            })
        } else {
            this.editForm.controls['city'].setValue("");
            this.cities = [];
        }
    }

    updateVacancy(vacancy) {
        this._vacancyService.post(vacancy).subscribe(res => {
            let editModal = document.getElementById('editModal');
            this._alertService.success(res);
            $(editModal).scrollTop(0);
            this.sendVacancyEditedEvent.emit("nothing");
            setTimeout(() => {
                $(editModal).modal('toggle');
                this._alertService.clear();
            }, 2000)
        },
        err => {
            this._alertService.error(err);
        }) 
    }

    get editFormMethod() {
        return <FormArray>this.editForm.get('languages');
    }

    get editFormSkills() {
        return <FormArray>this.editForm.get('skills');
    }

    get titleHasError() {
        const control = this.editForm.get('title');
        return control.hasError('required') && control.touched;
    }

    get positionHasError() {
        const control = this.editForm.get('position');
        return control.hasError('required') && control.touched;
    }

    get typeHasError() {
        const control = this.editForm.get('type');
        return control.hasError('required') && control.touched;
    }

    get yoeHasError() {
        const control = this.editForm.get('yoe');
        return control.hasError('required') && control.touched;
    }
    get educationHasError() {
        const control = this.editForm.get('education');
        return control.hasError('required') && control.touched;
    }

    get statusHasError() {
        const control = this.editForm.get('status');
        return control.hasError('required') && control.touched;
    }

    get commentsHasError() {
        const control = this.editForm.get('comments');
        return control.hasError('required') && control.touched;
    }
    
    languageHasError(index) {
        let control = this.editForm.get(`languages.${index}.language`);
        return control.hasError('required') && control.touched;
    }

    languageLevelHasError(index) {
        const control = this.editForm.get(`languages.${index}.level`);
        return control.hasError('required') && control.touched;
    }

    skillsHasError(index) {
        let control = this.editForm.get(`skills.${index}.value`);
        return control.hasError('required') && control.touched;
    }
}
