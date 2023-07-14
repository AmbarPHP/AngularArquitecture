import { Component } from '@angular/core';
import { CandidateConctactInfoService } from '../../../_services/candidate/contact-info';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'my-account-candidate-contactinfo',
    templateUrl: 'my-account-candidate-contactinfo.component.html',
    styleUrls: ['my-account-candidate-contactinfo.scss']
})

export class MyAccountCandidateContactInfoComponent {

    constructor(private _contactInfoService: CandidateConctactInfoService) {}

    candidateContactInfo: any;

    ngOnInit() {
        this._contactInfoService.get().subscribe(res => {
            this.candidateContactInfo = res;
            console.log("contact Info", this.candidateContactInfo);
        })
    }

    updateContact() {
        this._contactInfoService.post(this.candidateContactInfo).subscribe(res => {
            console.log("exito", res)
        })
    }
}