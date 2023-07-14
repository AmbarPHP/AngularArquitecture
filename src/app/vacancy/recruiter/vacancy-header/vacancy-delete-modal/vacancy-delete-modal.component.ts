import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VacancyService } from '../../../../_services/index';

@Component({
    selector: 'vacancy-delete-modal',
    templateUrl: 'vacancy-delete-modal.component.html'
})

export class VacancyDeleteModalComponent {

    constructor(private vacancyService: VacancyService) {}

    @Input()
    cardsSelected: any;

    @Output()
    sendDeleteVacancies: EventEmitter<any> = new EventEmitter();

    deleteVacancy(cardsSelected) {
        for(let i = 0; i < cardsSelected.length; i++) {
            this.vacancyService.delete(cardsSelected[i]).subscribe(res => {
                if(i === 0) {
                    $("#deleteVacancyModal").modal('toggle');
                }
                if(i === (cardsSelected.length - 1)) {
                    this.sendDeleteVacancies.emit("nothing to emit")
                }
            },
            err => {
                console.log(err)
            })

        }
    }
}