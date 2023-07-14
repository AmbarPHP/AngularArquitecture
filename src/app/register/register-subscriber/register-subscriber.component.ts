import { Subscriber } from './../../_models/subscriber';
import { SubscriberService } from './../../_services/subscriber.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    selector: 'register-subscriber',
    templateUrl: 'register-subscriber.component.html',
    styleUrls: ['register-subscriber.component.scss']
})
export class RegisterSubscriberComponent {

    @Output()
    subscriberEmail: EventEmitter<any> = new EventEmitter();
    subscriberModel = new Subscriber(null)

    subscribe(form) {
        this.subscriberEmail.emit(form);
    }


}
