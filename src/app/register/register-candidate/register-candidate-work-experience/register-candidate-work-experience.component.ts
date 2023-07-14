import { CandidateWorkExperienceService } from './../../../_services/candidate/work-experience';
import { CandidateSkillsService } from './../../../_services/candidate/skills';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'register-candidate-work-experience',
    templateUrl: 'register-candidate-work-experience.component.html',
    styleUrls: ['register-candidate-work-experience.component.scss']
})
export class RegisterCandidateWorkExperienceComponent {
    work_infos: any = [];
    work_info_blank: any;
    // work_info = {
    //     currently_working: false
    // }

    noWorkExperience: boolean = false;

    nextStep: number = 4;
    previousStep: number = 2;

    workExperienceForm: FormGroup;
    loading: boolean = false;

    constructor(private workService: CandidateWorkExperienceService,
                private fb: FormBuilder) { }


    @Output()
    sendNextPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendPreviousPageEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSkipEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.loading = true;
        this.workService.get().subscribe(res => {
            this.work_infos = res;
            console.log("work infos", this.work_infos);
            this.createForm();
            this.loading = false;
        })
    }

    createForm() {
        this.workExperienceForm = this.fb.group({
            experiences: this.fb.array(
                this.generateExperiences()
            )
        })
    }

    generateExperiences() {
        const experiences = [];
        for(let i = 0; i < this.work_infos.length; i++) {
            experiences.push(this.fb.group({
                id: [this.work_infos[i].id || ''],
                name: [this.work_infos[i].name || ''],
                location: [this.work_infos[i].location || ''],
                position: [this.work_infos[i].position || ''],
                from_date: [this.work_infos[i].from_date || ''],
                to_date: [{value: this.work_infos[i].to_date || '', disabled: this.work_infos[i].currently_working}],
                responsabilities: [this.work_infos[i].responsabilities || ''],
                rate: [this.work_infos[i].rate || ''],
                no_work_experience: [false],
                currently_working: [this.work_infos[i].currently_working || false]
            }))
        }
        return experiences;
    }

    addExperience() {
        const control = <FormArray>this.workExperienceForm.controls['experiences'] as FormArray;
        control.push(
            this.fb.group({
                id: [''],
                name: [''],
                location: [''],
                position: [''],
                from_date: [''],
                to_date: [''],
                responsabilities: [''],
                rate: [''],
                no_work_experience: [false],
                currently_working: [false]
            })
        )
    }

    deleteExperience() {
        const control = <FormArray>this.workExperienceForm.controls['experiences'] as FormArray;
        control.removeAt(control.length - 1);
    }

    currentlyWorkHere(event, i) {
        if(event) {
            this.workExperienceForm.get(`experiences.${i}.to_date`).disable();
            this.workExperienceForm.get(`experiences.${i}.to_date`).reset();
        } else {
            this.workExperienceForm.get(`experiences.${i}.to_date`).enable();
            this.workExperienceForm.get(`experiences.${i}.to_date`).reset();
        }
    }

    nextPage() {
        if(this.noWorkExperience === true) {
            this.workExperienceForm.reset()
            console.log("form", this.workExperienceForm.value)
            this.workService.get().subscribe(res => {
                // if no work experience is checked all exeriences are deleted
                if(res.length > 0 && res[0].id != "") {
                    for(let i = 0; i < res.length; i++) {
                        this.workService.delete(res[i].id);
                    }
                    this.sendNextPageEvent.emit(this.nextStep);
                } else {
                    this.sendNextPageEvent.emit(this.nextStep);
                }
            })
        } else {
            this.workService.post(this.workExperienceForm.value.experiences).subscribe(res => {
                this.sendNextPageEvent.emit(this.nextStep);
            }, err => {
                console.log(err);
            });            
        }
    }

    previousPage() {
        this.sendPreviousPageEvent.emit(this.previousStep);
    }

    getNoWorkExperience(checked) {
        console.log(checked);
    }

    skip() {
        this.sendSkipEvent.emit(this.nextStep);
    }
    
}