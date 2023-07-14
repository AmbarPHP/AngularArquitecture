import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../../../_services/vacancy.service';

@Component({
    selector: 'vacancy-detail-candidate',
    templateUrl: 'vacancy-detail-candidate.component.html',
    styleUrls: ['vacancy-detail-candidate.scss']
})

export class VacancyDetailCandidateComponent {

    constructor(private _vacancyService: VacancyService,
                private _activatedRoute: ActivatedRoute) {}

    vacancy: any;
    loading: boolean = true;
    id: any;
    isApplicant: any;
    msgs: any = [];

    ngOnInit() {
        this.getVacancy();

    }

    getVacancy() {
        this._activatedRoute.params.subscribe(params => {
            this.id = params.id;
            console.log("id", this.id)
        },
        err => {
            console.log(err);
        })

        this._vacancyService.get(this.id).subscribe(res => {
            this.vacancy = res;
            this.isApplicant = this.vacancy[0].is_applicant;
            this.loading = false;
        },
        err => {
            console.log(err)
        })
    }

    getApplyForJob(event) {
        this._vacancyService.apply(event).subscribe(res => {
            this.getVacancy();
            this.isApplicant = this.vacancy[0].is_applicant;
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: '', detail: 'Has aplicado a la vacante exitosamente.' });
        })
    }

    getNotInterested(event) {
        this._vacancyService.deleteApply(event).subscribe(res => {
            this.getVacancy();
            this.isApplicant = this.vacancy[0].is_applicant;
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: '', detail: 'Removido de vacante exitosamente.' });
        })
    }
}