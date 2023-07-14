import { Component } from '@angular/core';
import { CandidateLanguageService } from '../../../_services/candidate/languages';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';

@Component({
    selector: 'my-account-candidate-languages',
    templateUrl: 'my-account-candidate-languages.component.html',
    styleUrls: ['my-account-candidate-languages.scss']
})

export class MyAccountCandidateLanguagesComponent {

    constructor(private _languageService: CandidateLanguageService,
                private _alertService: AlertService) {}

    candidateLanguages: any;
    candidateLanguages_infos: any = [];
    candidateLanguages_infos_blank: any;
    candidateLanguages_displayed: any = [];
    languagesAllowed: number = 4;

    ngOnInit() {
        this._languageService.get().subscribe(res => {
            this.candidateLanguages = res;
            for(let i = 0; i < this.candidateLanguages.length; i ++) {
                this.candidateLanguages_displayed.push({editView: false})
            }
            if(this.candidateLanguages.length < 1) {
                this.addLanguage();
            }
        })

    }

    addLanguage() {
        if((this.candidateLanguages.length + this.candidateLanguages_infos.length) < this.languagesAllowed) {
            this.candidateLanguages_infos_blank = new CandidateLanguageModel('', '', '');
            this.candidateLanguages_infos.push(this.candidateLanguages_infos_blank);
        }
    }

    updateLanguages() {
        this._languageService.post(this.candidateLanguages_infos).subscribe(res => {
            this._languageService.get().subscribe(response => {
                this.candidateLanguages = response;
                this._alertService.success(res)
                this.addLanguage();
                this.candidateLanguages_infos = [];
                // Reset and close the Language edit view
                this.candidateLanguages_displayed = [];
                for(let i = 0; i < this.candidateLanguages.length; i ++) {
                    this.candidateLanguages_displayed.push({editView: false})
                }
            })
        })
    }

    deleteLanguage(id) {
        this._languageService.delete(id).subscribe(res => {
            this._languageService.get().subscribe(response => {
                this.candidateLanguages = response;
                this._alertService.success(res);
            })
        })
    }

    editLanguage(form, index) {
        this._languageService.post([form]).subscribe(res => {
            // Close the Education edit view
            this.candidateLanguages_displayed[index].editView = false;
            this._languageService.get().subscribe(response => {
                this.candidateLanguages = response;
                this._alertService.success(res);
                //Reset the Add forms to 1
                this.addLanguage();
                this.candidateLanguages_infos = [];
            })
        })
    }
}

export class CandidateLanguageModel {
    
        constructor(
            public id: string,
            public name: string,
            public level: string,
        ) { }
    
    }