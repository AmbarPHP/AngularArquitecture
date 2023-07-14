import { Component, Input } from '@angular/core';

@Component({
    selector: 'register-candidate-header',
    templateUrl: 'register-candidate-header.component.html',
    styleUrls: ['register-candidate-header.scss']
})

export class RegisterCandidateHeaderComponent {

    @Input()
    activeStep: number;
}