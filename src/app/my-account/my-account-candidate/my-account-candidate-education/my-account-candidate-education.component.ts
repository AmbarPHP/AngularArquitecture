import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidateEducationService } from '../../../_services/candidate/education';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'my-account-candidate-education',
    templateUrl: 'my-account-candidate-education.component.html',
    styleUrls: ['my-account-candidate-education.scss']
})

export class MyAccountCandidateEducationComponent {

    candidateEducation: any
    education_info_blank: any = {id: "", name: "", school: "", degree: "", completition_year: ""};
    education_infos: any = [];
    education_info: any
    education_displayed: any = [];
    educationsAllowed: number = 4;

    constructor(private _candidateEducationService: CandidateEducationService,
                private _alertService: AlertService) {

    }

    ngOnInit() {
        this._candidateEducationService.get().subscribe(res => {
            this.candidateEducation = res;
            console.log("education", this.candidateEducation);
            for(let i = 0; i < this.candidateEducation.length; i ++) {
                this.education_displayed.push({editView: false})
            }
            console.log("PRueba", this.education_displayed);
        })
        this.education_info_blank = new CandidateStudiesModel('', '', '', '', '');
        this.education_infos.push(this.education_info_blank);
    }

    addEducation() {
        this.education_info_blank = new CandidateStudiesModel('', '', '', '', '')
        if((this.education_infos.length + this.candidateEducation.length) < this.educationsAllowed) {
            this.education_infos.push(this.education_info_blank);
        }
    }

    deleteEducation(id) {
        this._candidateEducationService.delete(id).subscribe(res => {
            this._alertService.success(res);
            this._candidateEducationService.get().subscribe(response => {
                this.candidateEducation = response;
            })
        }, err => {
            console.log(err);
        })
    }

    updateEducation(form) {
        this._candidateEducationService.post(form).subscribe(res => {
            this._candidateEducationService.get().subscribe(response => {
                this.candidateEducation = response;
                this.education_info_blank = new CandidateStudiesModel('', '', '', '', '');
                this.education_infos = [this.education_info_blank];
                // Reset and close the Education edit view
                this.education_displayed = [];
                for(let i = 0; i < this.candidateEducation.length; i ++) {
                    this.education_displayed.push({editView: false})
                }
            })
        }, err => {
            console.log(err)
        })
    }

    editEducation(form, index) {
        this._candidateEducationService.post([form]).subscribe(res => {
            // Close the Education edit view
            this.education_displayed[index].editView = false;
            this._alertService.success(res);
            this._candidateEducationService.get().subscribe(response => {
                this.candidateEducation = response;
                //Reset the Add forms to 1
                this.education_info_blank = new CandidateStudiesModel('', '', '', '', '');
                this.education_infos = [this.education_info_blank];
            })
        })
    }
}

export class CandidateStudiesModel {
    
        constructor(
            public id: string,
            public name: string,
            public degree: string,
            public school: string,
            public completition_year: string,
        ) { }
    
    }