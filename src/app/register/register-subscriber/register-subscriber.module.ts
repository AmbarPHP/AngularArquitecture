import { SubscriberService } from './../../_services/subscriber.service';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { RegisterSubscriberComponent } from './register-subscriber.component';

@NgModule({
    imports: [

    ],
    declarations: [
        
    ],
    exports: [
        
    ]
})
export class RegisterSubscriberModule {

   constructor(private subscriberService: SubscriberService) {
    }

}
