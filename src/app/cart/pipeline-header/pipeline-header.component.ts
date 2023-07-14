import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'pipeline-header',
    templateUrl: 'pipeline-header.component.html', 
    styleUrls: ['pipeline-header.scss']
})

export class PipelineHeaderComponent {

    profileListView = true;

    @Input()
    selectedProfiles: any;

    @Input()
    pagedItems: any;

    @Output()
    sendDeselectAllEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendRemoveFromCartEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        console.log("paged", this.pagedItems);
    }

    deselectAll() {
        this.selectedProfiles = [];
        this.sendDeselectAllEvent.emit(this.selectedProfiles);
    }

    removeFromCart() {
        this.sendRemoveFromCartEvent.emit()
    }
}