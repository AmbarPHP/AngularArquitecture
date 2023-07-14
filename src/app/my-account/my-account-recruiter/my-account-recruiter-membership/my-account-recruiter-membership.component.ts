import { Component, Input } from '@angular/core';
import { MembershipService } from '../../../_services/membership.service';
import { CartService } from '../../../_services/cart.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
import { Message } from "primeng/primeng";

@Component({
    selector: 'my-account-recruiter-membership',
    templateUrl: 'my-account-recruiter-membership.component.html',
    styleUrls: ['my-account-recruiter-membership.component.scss']
})

export class MyAccountRecruiterMembershipComponent {
    msgs: Message[] = [];

    constructor(private _membershipService: MembershipService,
        private _cartService: CartService,
        private _authenticationService: AuthenticationService,
        private router: Router) { }

    annuallyState: boolean = true;

    @Input()
    memberships: any;

    ngOnInit() {

    }

    annuallyStateToggle(annuallyState: boolean) {
        if (annuallyState === this.annuallyState) {
            return
        } else {
            this.annuallyState = annuallyState;
        }
    }

    checkoutMembership(membershipId) {
        membershipId = membershipId.toString()
        this.AddMembership(membershipId);
    }

    AddMembership(membershipId) {
        // First remove all previous cart items
        let user = this.getUser();
        if (user) {
            this._cartService.getAll(user.cart_id).subscribe(res => {
                console.log("Cart", res)
                let items = res.items;
                if (items.length > 0) {
                    for (let i = 0; i < items.length; i++) {
                        let itemType = items[i].type;
                        if (itemType === 'Profiles') {
                            itemType = 'profile';
                        };
                        if (itemType === 'Membership') {
                            itemType = 'membership';
                        }
                        this._cartService.removeProfile(this.getUser(), items[i].profile.id, itemType).subscribe(response => {
                            console.log(response);
                        });
                    }
                }
                // Then add the membership to the cart
                this.addMembershipToCart(membershipId);
            });
        } else {
            this._cartService.addLocalMembership(membershipId);
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: '', detail: 'Membresía agregada al carrito exitosamente.' });
        }
    }

    getUser() {
        return this._authenticationService.getUser();
    }

    addMembershipToCart(membershipId) {
        this._cartService.addProfile(this.getUser(), membershipId, 'membership').subscribe(res => {
            console.log("Checkout exitoso")
            this.router.navigate(['/cart/checkout'])
        }, err => {
            console.log("Error", err);
        });
    }
}