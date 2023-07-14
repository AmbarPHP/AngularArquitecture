import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vacancy-detail-header-mobile',
    templateUrl: 'vacancy-detail-header-mobile.component.html',
    styleUrls: ['vacancy-detail-header-mobile.scss']
})

export class VacancyDetailHeaderMobile {

    @Input()
    positionInfo: boolean;

    @Output()
    sendPositionInfoEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    changePositionInfo(positionInfo: boolean): void {
        this.positionInfo = positionInfo;
        this.sendPositionInfoEvent.emit(this.positionInfo);
    }


}