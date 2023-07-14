import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CandidateSkillsService } from '../../../_services/candidate/skills';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'my-account-candidate-skills',
    templateUrl: 'my-account-candidate-skills.component.html',
    styleUrls: ['my-account-candidate-skills.scss']
})

export class MyAccountCandidateSkillsComponent {

    constructor(private _skillsService: CandidateSkillsService,
                private _alertService: AlertService) {}

    candidateSkills: any;

    candidateSkills_infos: any = [];
    candidateSkills_infos_blank: any;
    candidateSkills_info: any = {id: '', name: '', yoe: ''}
    skillsAllowed: number = 4;

    ngOnInit() {
        this._skillsService.get().subscribe(res => {
            this.candidateSkills = res;
            console.log(this.candidateSkills);
            if(this.candidateSkills.length < 1) {
                this.addSkill();
            }
        })
    }

    addSkill() {
        if((this.candidateSkills.length + this.candidateSkills_infos.length) < this.skillsAllowed) {
            this.candidateSkills_infos_blank = new CandidateSkillsModel('', '', '');
            this.candidateSkills_infos.push(this.candidateSkills_infos_blank);
        }
    }

    updateSkills() {
        this._skillsService.post(this.candidateSkills_infos).subscribe(res => {
            this._skillsService.get().subscribe(response => {
                this.candidateSkills = response;
                this._alertService.success(res);
            })
            if((this.candidateSkills.length + this.candidateSkills_infos.length) < this.skillsAllowed) {
                this.candidateSkills_infos = [];
                this.addSkill();
            } else {
                this.candidateSkills_infos = [];
            }
        })
    }

    deleteSkill(id) {
        this._skillsService.delete(id).subscribe(res => {
            this._skillsService.get().subscribe(response => {
                this.candidateSkills = response;
                this._alertService.success(res);
            })
        })
    }
}

export class CandidateSkillsModel {
    constructor(
        public id: string,
        public name: string,
        public yoe: string
    ) {}
}