import { Component } from '@angular/core';

@Component({
    selector: 'iframe-wizard.component',
    templateUrl: 'iframe-wizard.component.html',
    styleUrls: ['iframe-wizard.scss']
})

export class IframeWizardComponent {

    constructor() {}

    wizardStep: number = 1;

    ngOnInit() {}

    getPersonalInformation(event) {

    }

    getWizardStep(event) {
        this.wizardStep = event;
    }
}