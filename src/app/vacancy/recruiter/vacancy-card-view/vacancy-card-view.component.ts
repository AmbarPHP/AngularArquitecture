import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vacancy } from '../../../_models/index';

@Component({
    selector: 'vacancy-card-view',
    templateUrl: 'vacancy-card-view.component.html',
    styleUrls: ['vacancy-card-view.scss']
})

export class VacancyCardViewComponent {
    @Input()
    cardsSelected: any;
    
    @Input()
    filterString: any;

    @Input()
    userType: any;

    getCardsSelected(event) {
        this.cardsSelected = event;
        this.sendCardsSelected();
    }

    @Output()
    eventCardsSelected: EventEmitter<any> = new EventEmitter();

    @Output()
    sendSelectedCardEvent: EventEmitter<any> = new EventEmitter();
    
    @Output()
    sendUnselectedCardEvent: EventEmitter<any> = new EventEmitter();

    sendCardsSelected() {
        this.eventCardsSelected.emit(this.cardsSelected);
    }

    @Input()
    vacanciesView: any;

    @Input()
    pagedItems: any;

    checkCard(idVacancy) {
        this.sendSelectedCardEvent.emit(idVacancy);
    }

    uncheckCard(idVacancy) {
        this.sendUnselectedCardEvent.emit(idVacancy);
    }

    getCheckBoxesSaved(idVacancy) {
        for(let i = 0; i < this.cardsSelected.length; i++) {
            if(this.cardsSelected[i] == idVacancy) {
                return true
            }
        }
        return false;
    }

    shareTwitter(postingTitle, jobDescription, country, vacancyId) {
        let vacancyInformation = `More information about this vacancy in https://zourcing.com/%23/vacancies-candidate/${vacancyId}`;
        window.open(`https://twitter.com/intent/tweet?text=New Zourcing Vacancy! ${postingTitle}, ${jobDescription} in ${country} - ${vacancyInformation}`, '_blank');
    }

    shareFacebook(postingTitle, jobDescription, country, vacancyId) {
        let zourcingVacancy = `https%3A%2F%2Fzourcing.com%2F%23%2Fvacancies-candidate%2F${vacancyId}`;
        let vacancyUrl = `https%3A%2F%2Fzourcing.com%2F%23%2Fvacancies-candidate%2F`;
        let vacancyInformation = `New Zourcing Vacancy! ${postingTitle}, ${jobDescription} in ${country} - More information about this vacancy in ${zourcingVacancy}`
        window.open(`https://www.facebook.com/dialog/share?app_id=1099303473510587&quote=${vacancyInformation}&display=popup&href=${vacancyUrl}&redirect_uri=${vacancyUrl}`, '_blank');
    }
}