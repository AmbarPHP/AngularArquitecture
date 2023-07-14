import { Component, Input } from '@angular/core';
import { CandidateWorkExperienceService } from '../../../_services/candidate/work-experience';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'my-account-candidate-workexperience',
    templateUrl: 'my-account-candidate-workexperience.component.html',
    styleUrls: ['my-account-candidate-workexperience.scss']
})

export class MyAccountCandidateWorkExperienceComponent {

    constructor(private _workExperienceService: CandidateWorkExperienceService,
                private _alertService: AlertService) {}

    candidateWorkExperience: any;
    workExperience_info_blank: any = { id: "", currently_working: "", from_date: "", location: "", name: "", no_work_experience: "", position: "", rate: "", to_date: "" }
    workExperience_infos: any = [];
    workExperience_displayed: any = [];
    workExperiencesAllowed: number = 4;

    ngOnInit() {
        this._workExperienceService.get().subscribe(res => {
            this.candidateWorkExperience = res;
            for(let i = 0; i < this.candidateWorkExperience.length; i ++) {
                this.workExperience_displayed.push({editView: false})
            }
        })
        this.workExperience_info_blank = new CandidateWorkExperienceModel('', '', false, '', false, '', '', '');
        this.workExperience_infos.push(this.workExperience_info_blank);
    }

    addWorkExperience() {
        this.workExperience_info_blank = new CandidateWorkExperienceModel('', '', false, '', false, '', '', '');
        if((this.candidateWorkExperience.length + this.workExperience_infos.length) < this.workExperiencesAllowed) {
            this.workExperience_infos.push(this.workExperience_info_blank);
        }
    }

    deleteWorkExperience(id) {
        this._workExperienceService.delete(id).subscribe(res => {
            this._alertService.success(res);
            this._workExperienceService.get().subscribe(response => {
                this.candidateWorkExperience = response;
            });
        })
    }

    updateWorkExperience() {
        this._workExperienceService.post(this.workExperience_infos).subscribe(res => {
            this._alertService.success(res);
            this._workExperienceService.get().subscribe(response => {
                this.candidateWorkExperience = response;
                this.workExperience_info_blank =  new CandidateWorkExperienceModel('', '', false, '', false, '', '', '');
                this.workExperience_infos = [this.workExperience_info_blank];
                // Reset and close the Education edit view
                this.workExperience_displayed = [];
                for(let i = 0; i < this.candidateWorkExperience.length; i ++) {
                    this.workExperience_displayed.push({editView: false})
                }
            })
        })
    }

    editWorkExperience(form, index) {
        this._workExperienceService.post([form]).subscribe(res => {
            this._alertService.success(res);
            // Close the Education edit view
            this.workExperience_displayed[index].editView = false;
            // this._alertService.success(res);
            this._workExperienceService.get().subscribe(response => {
                this.candidateWorkExperience = response;
                //Reset the Add forms to 1
                this.workExperience_info_blank = new CandidateWorkExperienceModel('', '', false, '', false, '', '', '');
                this.workExperience_infos = [this.workExperience_info_blank];
            })
        })
    }
}

export class CandidateWorkExperienceModel {
    
        constructor(
            public id: string,
            public name: string,
            public currently_working: any,
            public from_date: string,
            public no_work_experience: any,
            public position: string,
            public rate: string,
            public to_date: string,    
        ) { }
    
    }