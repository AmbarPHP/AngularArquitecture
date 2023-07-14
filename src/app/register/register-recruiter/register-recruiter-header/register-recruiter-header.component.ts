import { Component, Input } from '@angular/core';

@Component({
    selector: 'register-recruiter-header',
    templateUrl: 'register-recruiter-header.component.html',
    styleUrls: ['register-recruiter-header.scss']
})

export class RegisterRecruiterHeaderComponent {
    
    @Input()
    recruiterFirstStep: boolean;
}