import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'profile-main-filter-mobile',
    templateUrl: 'profile-main-filter-mobile.component.html',
    styleUrls: ['profile-main-filter-mobile.scss']
})

export class ProfileMainFilterMobile {

    @Input() termMobile;
    @Input() orderSelected: string = "";

    @Output()
    sendMainSearchEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendOrderByEvent: EventEmitter<any> = new EventEmitter();

    searchProfiles(value) {
        this.sendMainSearchEvent.emit(value);
    }

    searchOrderBy(value){
        console.log(value);
        this.sendOrderByEvent.emit(value);
    }
}