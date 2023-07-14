import { Component } from '@angular/core';

@Component({
    selector: 'register-recruiter',
    templateUrl: 'register-recruiter.component.html',
    styleUrls: ['register-recruiter.scss']
})

export class RegisterRecruiterComponent {
    recruiterFirstStep: boolean = true;
}