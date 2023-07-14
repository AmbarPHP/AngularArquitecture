import { MembershipService } from './../../_services/membership.service';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

@Component({
    selector: 'pipeline-price',
    templateUrl: 'pipeline-price.component.html',
    styleUrls: ['pipeline-price.scss']
})

export class PipelinePriceComponent {

    remainingCredits: any;
    msgs: Message[] = [];

    constructor(private router: Router, private _membershipService: MembershipService) { }

    @Input()
    profiles: any;

    @Input()
    total: any;

    ngOnInt() {
        console.log(this.profiles);
    }

    buyWithCredits() {
        $('#credits-confirmation-modal').modal('show');
    }


    checkout() {

        this._membershipService.getUserMembership().subscribe(res => {
            this.remainingCredits = res[0].remaining_credits;

            if (this.remainingCredits > 0) {
                this.buyWithCredits();

            } else {

                if (!localStorage.getItem('currentUser')) {
                    this.msgs = [];
                    if (localStorage.getItem('userLanguage') === 'es') {
                        this.msgs.push({ severity: 'danger', summary: '', detail: 'Debes iniciar sesión para comprar.' });
                    } else {
                        this.msgs.push({ severity: 'danger', summary: '', detail: 'Login to start buying profiles.' });
                    }
                    return;
                }
                this.router.navigate(['/cart/checkout']);
            }

        });

    }
}
