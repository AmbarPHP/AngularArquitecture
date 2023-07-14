import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'profile-header',
    templateUrl: 'profile-header.component.html',
    styleUrls: ['profile-header.scss']
})

export class ProfileHeaderComponent {

    @Input()
    selectedProfiles: any;

    @Input()
    msgs: any = [];

    @Input()
    remainingCredits: any;

    @Output()
    sendDeselectAllEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendAddToCartEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendProfileCardsQtyEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendChangeProfileCardsQtyEvent: EventEmitter<any> = new EventEmitter();

    profilesQtyActivated: number = 12;

    addToCart() {
        this.sendAddToCartEvent.emit();
        this.sendDeselectAllEvent.emit();
    }

    deselectAll() {
        this.sendDeselectAllEvent.emit();
    }

    getChangeProfileCardsQty(event) {
        this.sendChangeProfileCardsQtyEvent.emit(event);
    }

    buyWithCredits() {
        $('#credits-confirmation-modal').modal('show');
    }
}