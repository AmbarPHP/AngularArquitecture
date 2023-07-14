import { Component } from '@angular/core';

@Component({
    selector: 'register-candidate',
    templateUrl: 'register-candidate.component.html',
    styleUrls: ['register-candidate.scss']
})

export class RegisterCandidateComponent {
    skillsInformation: any;
    studiesInformation: any;
    workExperienceInformation: any;
    languagesInformation: any;
    personalInformation: boolean = true;
    activeStep: number = 1;

    ngOnInit() {
        // this._locationService.getAllCountries().subscribe(res => {
        //     this.countries = res;
        // })
    }

    // getPersonalInformation(event) {
    //     this.personalInformation = event;
    //     this.studiesInformation = !(event);
    // }

    // getLanguagesInformation(event) {
    //     this.languagesInformation = event;
    // }

    // getSkillsInformation(event) {
    //     this.languagesInformation = !(event);
    //     this.skillsInformation = event;
    // }

    // getStudiesInformation(event) {
    //     this.workExperienceInformation = !(event);
    //     this.studiesInformation = event;
    // }

    // getworkExperienceInformation(event) {
    //     this.workExperienceInformation = event;
    //     this.skillsInformation = !(event);
    // }

    getSkipEvent(event) {
        this.activeStep = event;
    }
}