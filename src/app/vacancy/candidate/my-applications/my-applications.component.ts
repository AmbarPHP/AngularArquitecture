import { Component } from '@angular/core';
import { VacancyService } from '../../../_services/vacancy.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-applications',
    templateUrl: 'my-applications.component.html',
    styleUrls: ['my-applications.scss']
})

export class MyApplicationsComponent {
    msgs: any;
    applications: any;
    notInterested: any = [];
    userId: any;
    loading: any = true;
    term: string = "";

    constructor(private _vacancyService: VacancyService,
                private _authenticationService: AuthenticationService,
                private router: Router) {}

    ngOnInit() {
        if(!this._authenticationService.userTypeIsValid()) {
            this.router.navigate(['/login'], { queryParams: { invalidType: true } } );
        }
        this.getAllApplications();
    }

    getEmail(applicationId){
        this._vacancyService.sendEmail(applicationId).subscribe(res => {
            this.msgs.push({
                severity: 'info',
                summary: '',
                detail: 'Email sent successfully to recruiter.'
            });
            console.log(res);
        })
    }
    getAllApplications() {
        this._vacancyService.getAllApplications().subscribe(res => {
            this.applications = res;
            console.log(res);
            this.loading = false;
        })
    }

    getNotInterested(notInterestedEvent) {
        this.notInterested = notInterestedEvent;
        console.log(this.notInterested);
    }

    getDeselectAllApplications(notInterestedEvent) {
        this.notInterested = notInterestedEvent;
        console.log(this.notInterested);
    }

    getRemoveApplicants(notInterestedEvent) {
        console.log(notInterestedEvent)

        for(let i = 0; i < notInterestedEvent.length; i++) {
            this._vacancyService.deleteApply(notInterestedEvent[i]).subscribe(res => {
                console.log(res);
                this.loading = true;
                this.getAllApplications();
                $('#notInterestedModal .close').click();
            },
            err => {
                console.log(err);
            })
        }
        this.notInterested = [];

    }

    getTermString(termEvent) {
        this.term = termEvent;
    }

    getClearTerm(termEvent) {
        this.term = termEvent;
    }
}