import { CandidateSkillsService } from './../../../_services/candidate/skills';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'register-candidate-skills',
    templateUrl: 'register-candidate-skills.component.html',
    styleUrls: ['register-candidate-skills.component.scss']
})
export class RegisterCandidateSkillsComponent {
    skills: any;
    nextStep: number = 5;
    previousStep: number = 3;
    skillsAllowed: number = 4;

    skillsForm: FormGroup;
    loading: boolean = false;

    constructor(private skillService: CandidateSkillsService,
                private fb: FormBuilder) { }


    @Output()
    sendNextPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendPreviousPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSkipEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.loading = true;
        this.skillService.get().subscribe((data) => {
            this.skills = data;
            this.createForm();
            this.loading = false;
        })
    }

    createForm() {
        this.skillsForm = this.fb.group({
            skills: this.fb.array(
                this.generateSkills()
            )
        })
    }

    generateSkills() {
        const skills = [];
        for(let i = 0; i < this.skills.length; i++) {
            skills.push(this.fb.group({
                id: [this.skills[i].id || ''],
                name: [this.skills[i].name || '', Validators.required],
                yoe: [this.skills[i].yoe || '', Validators.required]
            }))
        }
        return skills;
    }

    addSkill() {
        const control = <FormArray>this.skillsForm.controls['skills'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: ['', Validators.required],
                yoe: ['', Validators.required],
            })
        )
    }

    deleteSkill(){
        const control = <FormArray>this.skillsForm.controls['skills'] as FormArray;
        control.removeAt(control.length - 1);
    }

    nextPage() {
        this.skillService.post(this.skillsForm.value.skills).subscribe(res => {
            console.log("res", res)
            this.sendNextPageEvent.emit(this.nextStep)
        }, err => {
            console.log("error", err)
        })
    }

    previousPage() {
        this.sendPreviousPageEvent.emit(this.previousStep);
    }

    nameHasError(index) {
        const control = this.skillsForm.get(`skills.${index}.name`);
        return control.hasError('required') && control.touched;
    }

    yoeHasError(index) {
        const control = this.skillsForm.get(`skills.${index}.yoe`);
        return control.hasError('required') && control.touched;
    }

    skip() {
        this.sendSkipEvent.emit(this.nextStep);
    }
}