import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormGroupName } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { CandidateWorkExperienceService } from '../../../_services/candidate/work-experience';
import { CandidateSkillsService } from '../../../_services/candidate/skills';
import { CandidateLanguageService } from '../../../_services/candidate/languages';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms/src/directives/default_value_accessor';
import { VacancyService } from '../../../_services/vacancy.service';
import { IframeService } from '../../../_services/iframe.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
    selector: 'iframe-wizard-work-experience',
    templateUrl: 'iframe-wizard-work-experience.component.html',
    styleUrls: ['iframe-wizard-work-experience.scss']
})

export class IframeWizardWorkExperienceComponent {

    constructor(private fb: FormBuilder,
                private _workExperienceService: CandidateWorkExperienceService,
                private _skillsService: CandidateSkillsService,
                private _languageService: CandidateLanguageService,
                private _vacancyService: VacancyService,
                private _iframeService: IframeService,
                private router: Router,
                private _authService: AuthenticationService) {}

    form: FormGroup;
    skillsForm: FormGroup;
    languagesForm: FormGroup;
    noWorkExperience: boolean = false;
    workExperience: any;
    skills: any;
    languages: any;
    loadingWorkExperience = true;
    loadingSkills = true;
    loadingLanguages = true;
    msgs: any = [];

    @Output()
    sendWizardStepEvent: EventEmitter<number> = new EventEmitter<number>();

    ngOnInit() {
        this._workExperienceService.get().subscribe(res => {
            this.workExperience = res;
            this.createForm();
            this.loadingWorkExperience = false;
        })
        this._skillsService.get().subscribe(res => {
            this.skills = res;
            this.createSkillsForm();
            this.loadingSkills = false;
        })
        this._languageService.get().subscribe(res => {
            this.languages = res;
            console.log("languages", this.languages);
            this.createLanguagesForm();
            this.loadingLanguages = false;
        })
    }

    createForm() {
        this.form = this.fb.group({
            workExperience: this.fb.array(this.createWorkExperience())
        })
    }

    createSkillsForm() {
        this.skillsForm = this.fb.group({
            skills: this.fb.array(this.createSkills())
        })
    }

    createLanguagesForm() {
        this.languagesForm = this.fb.group({
            languages: this.fb.array(this.createLanguages())
        })
    }

    changeCurrentlyWorking(index) {
        let currentlyWorkingIsdisabled = this.workExperienceArray.controls[`${index}`].controls['currently_working'].value;
        console.log("value", this.workExperienceArray.controls[`${index}`].controls['currently_working'].value)
        if(currentlyWorkingIsdisabled) {
            console.log(this.form)
            console.log(this.workExperienceArray);
            this.workExperienceArray.controls[`${index}`].controls['to_date'].disable();
        } else {
            console.log(this.workExperienceArray);
            this.workExperienceArray.controls[`${index}`].controls['to_date'].enable();
        }
    }

    get workExperienceArray() {
        return this.form.get('workExperience') as FormArray;
    }

    toDateDisabled(index) {
        return this.workExperience[index].currently_working;
    }


    changeNoWorkExperience(index) {
        this.noWorkExperience = this.workExperienceArray.controls[`${index}`].controls['no_work_experience'].value;
        console.log(this.workExperienceArray.controls.length);
        for(let i = (this.workExperienceArray.controls.length - 1); i >= 0; i--) {
            console.log("removiendo", i)
            this.workExperienceArray.removeAt(i);
        }
    }

    createWorkExperience() {

        const control = [];

        if(this.workExperience.length > 1) {
            for(let i = 0; i < this.workExperience.length; i++) {
                control.push(
                    this.fb.group({
                        id: [this.workExperience[i].id || ""],
                        name: [this.workExperience[i].name || ""],
                        location: [this.workExperience[i].location || ""],
                        position: [this.workExperience[i].position || ""],
                        from_date: [this.workExperience[i].from_date || ""],
                        to_date: [{value: this.workExperience[i].to_date || "", disabled: this.toDateDisabled(i)}],
                        currently_working: [this.workExperience[i].currently_working || false],
                        responsabilities: [this.workExperience[i].responsabilities || ""],
                        no_work_experience: [this.workExperience[i].no_work_experience || this.noWorkExperience],
                        rate: [this.workExperience[i].rate ||'']
                    })
                )
            }
        } else {
            control.push(
                this.fb.group({
                    id: [this.workExperience[0].id || ""],
                    name: [this.workExperience[0].name || ""],
                    location: [this.workExperience[0].location || ""],
                    position: [this.workExperience[0].position || ""],
                    from_date: [this.workExperience[0].from_date || ""],
                    to_date: [{value: this.workExperience[0].to_date || "", disabled: this.toDateDisabled(0)}],
                    currently_working: [this.workExperience[0].currently_working || false],
                    responsabilities: [this.workExperience[0].responsabilities || ""],
                    no_work_experience: [this.workExperience[0].no_work_experience || this.noWorkExperience],
                    rate: [this.workExperience[0].rate ||'']
                })
            )
        }

        return control;
    }

    createSkills() {
        const control = [];
        if(this.skills.length > 1) {
            for(let i = 0; i < this.skills.length; i++) {
                control.push(
                    this.fb.group({
                        id: [this.skills[i].id || ''],
                        name: [this.skills[i].name || ''],
                        yoe: [this.skills[i].yoe || '']
                    })
                )
            }
        } else {
            control.push(
                this.fb.group({
                    id: [this.skills[0].id || ''],
                    name: [this.skills[0].name || ''],
                    yoe: [this.skills[0].yoe || '']
                })
            )
        }

        return control;
    }

    createLanguages() {
        const control = [];
        if(this.languages.length > 1) {
            for(let i = 0; i < this.languages.length; i++) {
                control.push(
                    this.fb.group({
                        id: [this.languages[i].id || ''],
                        name: [this.languages[i].name || ''],
                        level: [this.languages[i].level || '']
                    })
                )
            }
        } else {
            control.push(
                this.fb.group({
                    id: [this.languages[0].id || ''],
                    name: [this.languages[0].name || ''],
                    level: [this.languages[0].level || '']
                })
            )
        }

        return control;
    }

    addWorkExperience() {
        const control = <FormArray>this.form.controls['workExperience'] as FormArray;
        if(this.noWorkExperience) {
            this.noWorkExperience = false;
            console.log("prueba", this.workExperienceArray.controls.length)
            let workExperienceLength = this.workExperienceArray.controls.length;
            control.push(
                this.fb.group({
                    id: [''],
                    name: [''],
                    location: [''],
                    position: [''],
                    from_date: [''],
                    to_date: [''],
                    currently_working: [false],
                    responsabilities: [''],
                    no_work_experience: [this.noWorkExperience],
                    rate: ['']
                })
            )


        } else {
            control.push(
                this.fb.group({
                    id: [''],
                    name: [''],
                    location: [''],
                    position: [''],
                    from_date: [''],
                    to_date: [''],
                    currently_working: [false],
                    responsabilities: [''],
                    no_work_experience: [this.noWorkExperience]
                })
            )
        }
    }

    addSkill() {
        const control = <FormArray>this.skillsForm.controls['skills'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: [''],
                yoe: ['']
            })
        )
    }

    addLanguage() {
        const control = <FormArray>this.languagesForm.controls['languages'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: [''],
                level: ['']
            })
        )
    }

    previousPage() {
        this.sendWizardStepEvent.emit(1);
    }

    apply() {
        // console.log("test", this.form.controls['workExperience'].value)
        this._workExperienceService.post(this.form.controls['workExperience'].value).subscribe(res => {
            console.log('exito worl', res);
        },
        err => {
            console.log(err);
        })

        this._skillsService.post(this.skillsForm.controls['skills'].value).subscribe(res => {
            console.log("exito skills", res);
        },
        err => {
            console.log(err);
        })

        this._languageService.post(this.languagesForm.controls['languages'].value).subscribe(res => {
            console.log("exito languages", res);
            this._vacancyService.apply(this._iframeService.vacancyId).subscribe(res => {
                console.log("apply!", res)
                this.msgs = [];
                this.msgs.push({ severity: 'info', summary: '', detail: 'Has aplicado a la vacante exitosamente.' });
                setTimeout(() => {
                    this.router.navigate(['/iframe-vacancies']);
                    this._authService.logout();
                }, 800);
            },
            err => {
                console.log(err);
            })
        },
        err => {
            console.log(err);
        })
    }



}