import { CandidateLanguageService } from './../../../_services/candidate/languages';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'register-candidate-languages',
    templateUrl: 'register-candidate-languages.component.html',
    styleUrls: ['register-candidate-languages.component.scss']
})
export class RegisterCandidateLanguagesComponent {
    languages: any;
    nextStep: number = 6;
    previousStep: number = 4;
    languagesAllowed: number = 4;

    languagesForm: FormGroup;
    loading: boolean = false;

    @Output()
    sendNextPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendPreviousPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSkipEvent: EventEmitter<any> = new EventEmitter();


    constructor(private languageService: CandidateLanguageService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.loading = true;
        this.languageService.get().subscribe(res => {
            this.languages = res;
            this.createForm();
            this.loading = false;
        })
    }

    createForm() {
        this.languagesForm = this.fb.group({
            languages: this.fb.array(
                this.generateLanguages()
            )
        })
    }

    generateLanguages() {
        const languages = [];
        for(let i = 0; i < this.languages.length; i++) {
            languages.push(this.fb.group({
                id: [this.languages[i].id || ''],
                name: [this.languages[i].name || '', Validators.required],
                level: [this.languages[i].level || '', Validators.required],
                level_id: [this.languages[i].level_id || ''],
            }))
        }
        return languages;
    }

    addLanguage() {
        const control = <FormArray>this.languagesForm.controls['languages'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: ['', Validators.required],
                level: ['', Validators.required],
                level_id: ['']
            })
        )
    }

    deleteLanguage() {
        const control = <FormArray>this.languagesForm.controls['languages'] as FormArray;
        control.removeAt(control.length - 1);
    }

    nextPage() {
        this.languageService.post(this.languagesForm.value.languages).subscribe(res => {
            console.log("res", res);
            this.sendNextPageEvent.emit(this.nextStep)
        }, err => {
            console.log("error", err)
        });
    }

    previousPage() {
        this.sendPreviousPageEvent.emit(this.previousStep);
    }

    nameHasError(index) {
        const control = this.languagesForm.get(`languages.${index}.name`);
        return control.hasError('required') && control.touched;
    }

    levelHasError(index) {
        const control = this.languagesForm.get(`languages.${index}.level`);
        return control.hasError('required') && control.touched;
    }

    skip() {
        this.sendSkipEvent.emit(this.nextStep);
    }
}