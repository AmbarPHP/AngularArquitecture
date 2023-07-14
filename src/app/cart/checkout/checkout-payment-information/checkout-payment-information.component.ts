import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../_services/cart.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
    selector: 'payment-information',
    templateUrl: 'checkout-payment-information.component.html',
    styleUrls: ['checkout-payment-information.scss']
})

export class CheckoutPaymentInformationComponent {

    complexForm: FormGroup;
    itemsIds: any = [];
    promoCodes: any = [];
    userId: any;

    constructor(fb: FormBuilder, private _cartService: CartService, private _authService: AuthenticationService) {
        this.complexForm = fb.group({
            'name': ['', Validators.required],
            'number': ['', Validators.required],
            'exp_year': ['', Validators.required],
            'cvv2': ['', Validators.required],
            'exp_month': ['', Validators.required],
            'token': '',
            'promocode': '',
            'promocode_type': '',
        });
    }

    ngOnInit() {
        this.getUserPromocode();
        this.userId = this._authService.getUser().id;
    }

    @Input()
    total: any;

    @Input()
    items: any;

    @Output()
    sendPayEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    sendPromocode: EventEmitter<any> = new EventEmitter();

    @Output()
    sendItemsIdsEvent: EventEmitter<any> = new EventEmitter();

    paymentFormValidation(complexForm) {
        this.sendPayEvent.emit(complexForm);
        this.sendItemsIdsEvent.emit(this.getItems());
    }

    getItems() {
        for (let i = 0; i < this.items.length; i++) {
            this.itemsIds.push(this.items[i].id);
        }
        return this.itemsIds;
    }

    get nameHasError() {
        const control = this.complexForm.get('name');
        // return true ? control.errors : false;
        return control.hasError('required') && control.touched;
    }

    get creditcardHasError() {
        const control = this.complexForm.get('number');
        // return true ? control.errors : false;
        return control.hasError('required') && control.touched;
    }

    get expMonthHasError() {
        const control = this.complexForm.get('exp_month');
        // return true ? control.errors : false;
        return control.hasError('required') && control.touched;
    }

    get expYearHasError() {
        const control = this.complexForm.get('exp_year');
        // return true ? control.errors : false;
        return control.hasError('required') && control.touched;
    }

    get cvvHasError() {
        const control = this.complexForm.get('cvv2');
        // return true ? control.errors : false;
        return control.hasError('required') && control.touched;
    }

    get promocodeHasError() {
        const control = this.complexForm.get('promocode');
        return control.hasError('required') && control.touched;
    }

    applyPromoCode() {
        const promocode = this.complexForm.get('promocode').value.toUpperCase();
        for (let i = 0; i < this.promoCodes[0].length; i++) {
            if (this.promoCodes[0][i].promocode === promocode) {
                if (this.promoCodes[0][i].user === this.userId) {
                    this.complexForm.controls['promocode_type'].setValue(this.promoCodes[0][i].type);
                    this.complexForm.controls['promocode'].setErrors(null); // clean error in promocode field
                    this.sendItemsIdsEvent.emit(this.getItems());
                    // this.sendPromocode.emit(this.complexForm.value.promocode);
                    this.sendPromocode.emit(this.complexForm);
                    return true;
                }
            }
        }

        this.complexForm.controls['promocode'].setErrors({ required: true });


    }

    getUserPromocode() {
        this._cartService.userPromocode().subscribe(res => {
            this.promoCodes = res;
            console.log('promocode', this.promoCodes);
        });
    }
}
