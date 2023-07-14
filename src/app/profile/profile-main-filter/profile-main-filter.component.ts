import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'profile-main-filter',
    templateUrl: 'profile-main-filter.component.html',
    styleUrls: ['profile-main-filter.scss']
})

export class ProfileMainFilterComponent implements OnInit {

    constructor(public _profileService: ProfileService) {}

    loading: boolean;
    termMobile: any = new FormControl();
    
    @Input() term;

    @Input()
    profileListView: any;

    @Input()
    orderSelected: string;

    @Output()
    sendLoadingEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendTermEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendTermMobileEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendProfileListViewEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendMainSearchEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendOrderByEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.sendTermEvent.emit(this.term);
        this.sendTermMobileEvent.emit(this.termMobile);
    }

    valuechange(){
        this.sendLoadingEvent.emit(true);
    }

    profileListViewToogle() {
        this.profileListView = !this.profileListView;
        this.sendProfileListViewEvent.emit(this.profileListView);
    }

    searchProfiles(value) {
        this._profileService.searchProfile.mainFilter = value;
        this.sendMainSearchEvent.emit(value);
    }
 
    searchOrderBy(value, evt){
        evt.preventDefault();
        this.orderSelected = value;
        this.sendOrderByEvent.emit(value);
    }
}