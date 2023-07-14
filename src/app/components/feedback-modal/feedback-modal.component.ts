import { Feedback } from './../../_models/feedback';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { FeedbackService } from '../../_services/feedback.service';
import { AlertService } from '../../_services/alert.service';

@Component({
    selector: 'feedback-modal',
    templateUrl: 'feedback-modal.component.html',
    styleUrls: ['feedback-modal.component.scss']
})

export class FeedbackModalComponent {

    constructor(private fb: FormBuilder,
                public _feedbackService: FeedbackService,
                public _alertService: AlertService,
                public _authService: AuthenticationService) {}

    feedbackForm: FormGroup;
    userName: string;
    email: string;
    currentUser: any;

    ngOnInit() {
        this.getUserInformation();
    }

    createFeedbackForm() {
        this.feedbackForm = this.fb.group({
            name: [this.userName || ''],
            email: [this.email || '', Validators.email],
            useful: ['true', Validators.required],
            rating: [''],
            improvement: [''],
            looking_for: ['']
        });
    }

    getUserInformation() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userName = this.currentUser.firstName;
            this.email = this.currentUser.email;
        }
        // Form created after getting userInformation from localStorage
        this.createFeedbackForm();
    }

    usefulNot() {
        this.feedbackForm.controls['rating'].reset('');
    }

    createFeedback() {
        this._feedbackService.create(this.feedbackForm).subscribe(res => {
            $('#feedbackModal').modal('hide');
            setTimeout(() => {
                $('#feedbackSuccessModal').modal('show');
            }, 1000);
        },
        err => {
            this._alertService.success(err);
            setTimeout(() => {
                this._alertService.clear();
            }, 2000);
        });
        this.closeFeedbackModal();

    }

    closeFeedbackModal() {
        this.feedbackForm.controls['useful'].reset('true');
        this.feedbackForm.controls['rating'].reset('');
        this.feedbackForm.controls['improvement'].reset('');
        this.feedbackForm.controls['looking_for'].reset('');
        $('#feedbackModal').modal('hide');
    }
}
