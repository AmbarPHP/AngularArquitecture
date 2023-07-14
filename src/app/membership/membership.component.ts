import { Component } from '@angular/core';
import { MembershipService } from '../_services/membership.service';
import { Router } from '@angular/router';
import { CartService } from '../_services';
import { Message } from "primeng/primeng";

@Component({
    selector: 'membership',
    templateUrl: 'membership.component.html',
    styleUrls: ['membership.component.scss']
})
export class MembershipComponent {
    msgs: Message[] = [];


    constructor(
        private _router: Router,
        private cartService: CartService,
        private _membershipService: MembershipService) {
            this.getMemberships();
         }
    memberships: any;

    getMemberships() {
        this._membershipService.getMemberships().subscribe(res => {
            this.memberships = res;
            this.memberships[0].sort((a, b) => {
                return a.id - b.id;
            });
        });
    }

}
