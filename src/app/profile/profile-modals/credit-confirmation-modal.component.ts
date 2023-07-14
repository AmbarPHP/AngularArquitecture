import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Input } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { Router } from '@angular/router';
import { MembershipService } from '../../_services/membership.service';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'credit-confirmation-modal',
    templateUrl: 'credit-confirmation-modal.component.html',
    styleUrls: ['credit-confirmation-modal.component.scss']
})

export class CreditConfirmationModalComponent {

    currentUser: any;
    constructor(private _cartService: CartService,
                private router: Router,
                private _membershipService: MembershipService,
                private _profileService: ProfileService,
                private _authenticationService: AuthenticationService) {}

    @Input()
    zourcedProfile: any;

    @Input()
    selectedProfiles: any;

    ngOnInit() {
        this.currentUser = this._authenticationService.getUser();

        // $('#credit-success-modal').modal({
        //     backdrop: 'static'
        // })
    }

    getProfile() {
        this._cartService.buyProfileWithCredit(this.zourcedProfile).subscribe(res => {
            console.log('Res', res);
            $('#credit-confirmation-modal').modal('hide');
            // update profiles
            this.updateMembershipProfiles();
            this._profileService.checkoutCompleted = true;
            setTimeout(() => {
                $('#credit-success-modal').modal({
                    backdrop: 'static'
                });
            }, 800);
        }, err => {
            console.log('Error', err);
        });
    }

    getProfiles() {
        this._cartService.buyProfileWithCredit(this.selectedProfiles).subscribe(res => {
            console.log('Res Array', res);
            $('#credits-confirmation-modal').modal('hide');
            // update profiles
            this.updateMembershipProfiles();
            this._profileService.checkoutCompleted = true;
            this._cartService.removeProfileArray(this.currentUser, this.selectedProfiles, 'profiles');
            setTimeout(() => {
                $('#credit-success-modal').modal({
                    backdrop: 'static'
                });
            }, 800);
        }, err => {
            console.log('Error Array', err);
        });
    }

    goToTalent() {
        $('#credit-success-modal').modal('hide');
        setTimeout(() => {
            this.router.navigate(['/talent']);
        }, 800);
    }

    updateMembershipProfiles() {
        this._membershipService.getUserMembership().subscribe(membership => {
            this._membershipService.userMembership$.next(membership);
        }, err => {
            console.log('Error update membership', err);
        });
    }
}
