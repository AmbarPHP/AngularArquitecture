import { Component, Input } from '@angular/core';

@Component({
    selector: 'more-description-btn',
    templateUrl: 'more-description-btn.component.html',
    styleUrls: ['more-description-btn.component.scss']
})

export class MoreDescriptionBtnComponent {

    @Input()
    profile: any;
}