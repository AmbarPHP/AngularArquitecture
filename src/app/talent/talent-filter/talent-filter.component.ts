import { Component, EventEmitter, Output } from '@angular/core';


@Component({
    selector: 'talent-filter',
    templateUrl: 'talent-filter.component.html',
    styleUrls: ['talent-filter.scss']
})

export class TalentFilterComponent {
    term: any;

    @Output()
    sendTalentMainFilter: EventEmitter<any> = new EventEmitter();

    getTalentSearchValue(value) {
        this.sendTalentMainFilter.emit(value);
    }

}