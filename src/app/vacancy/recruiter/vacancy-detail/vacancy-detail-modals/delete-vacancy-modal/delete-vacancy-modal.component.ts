import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'delete-vacancy-modal',
    templateUrl: 'delete-vacancy-modal.component.html',
    styleUrls: ['delete-vacancy-modal.scss']
})

export class DeleteVacancyModalComponent {

    @Input()
    vacancyToBeDeleted: any;

    @Output()
    sendDeleteVacancyConfirmationEvent: EventEmitter<any> = new EventEmitter();

    deleteVacancyConfirmation() {
        console.log("qui si")
        this.sendDeleteVacancyConfirmationEvent.emit(this.vacancyToBeDeleted);
    }

}