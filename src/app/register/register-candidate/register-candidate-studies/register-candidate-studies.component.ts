import { CandidateEducationService } from './../../../_services/candidate/education';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'register-candidate-studies',
    templateUrl: 'register-candidate-studies.component.html',
    styleUrls: ['register-candidate-studies.component.scss']
})
export class RegisterCandidateStudiesComponent {
    education_infos: any = [];
    educationsAllowed: number = 4;

    educationForm: FormGroup;

    nextStep: number = 3;
    previousStep: number = 1;

    loading = false;

    @Output()
    sendNextPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendPreviousPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSkipEvent: EventEmitter<any> = new EventEmitter();

    constructor(private educationService: CandidateEducationService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.loading = true;
        this.educationService.get().subscribe((data) => {
            console.log(data)
            this.education_infos = data;
            this.createForm();
            this.loading = false
            // Add extra
            // if (this.education_infos.length < 1) {
            //     this.education_info_blank = new CandidateStudiesModel('', '', '', '', '');
            //     this.education_infos.push(this.education_info_blank)
            // }
        })
    }

    createForm() {
        this.educationForm = this.fb.group({
            educations: this.fb.array(
                this.generateEducations()
            )
        })
    }

    generateEducations() {
        const educations = [];
        for(let i = 0; i < this.education_infos.length; i++) {
            educations.push(this.fb.group({
                id: [this.education_infos[i].id || ''],
                name: [this.education_infos[i].name || '', Validators.required],
                school: [this.education_infos[i].school || '', Validators.required],
                degree: [this.education_infos[i].degree || ''],
                completition_year: [this.education_infos[i].completition_year || '']
            }))
        }
        return educations;
    }

    addEducation() {
        const control = <FormArray>this.educationForm.controls['educations'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: ['', Validators.required],
                school: ['', Validators.required],
                degree: [''],
                completition_year: ['']
            })
        )
    }

    deleteEducation() {
        const control = <FormArray>this.educationForm.controls['educations'] as FormArray;
        control.removeAt(control.length - 1);
    }

    nextPage() {
        console.log("test", this.educationForm.value.educations)
        this.educationService.post(this.educationForm.value.educations).subscribe(res => {
            console.log("exito", res)
            this.sendNextPageEvent.emit(this.nextStep)
        }, err => {
            console.log("err", err);
        });
    }

    previousPage() {
        this.sendPreviousPageEvent.emit(this.previousStep);
    }

    careerHasError(index) {
        const control = this.educationForm.get(`educations.${index}.name`);
        return control.hasError('required') && control.touched;
    }

    schoolHasError(index) {
        const control = this.educationForm.get(`educations.${index}.school`);
        return control.hasError('required') && control.touched;
    }

    skip() {
        this.sendSkipEvent.emit(this.nextStep);
    }
}
