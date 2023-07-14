import { Injectable } from '@angular/core';
declare var mixpanel: any;

@Injectable()
export class mixpanelTrackerService {

    userMixPanel: any;

    sendVisitedPage(page) {
        if(localStorage.getItem('currentUser')) {
            this.userMixPanel = JSON.parse(localStorage.getItem('currentUser'));
            this.userMixPanel = this.userMixPanel.firstName;
        } else {
            this.userMixPanel = 'Anonymus user'
        }

        mixpanel.track(`User open ${page} page`, {'user': this.userMixPanel})
    }
}