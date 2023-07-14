import {Component, OnInit} from "@angular/core";
import "../../assets/app.css";
import {Router} from "@angular/router";
import {SalaryService} from "../_services/salary.service";
import {AlertService} from "../_services/index";


@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'salary.component.html',
    styleUrls: ['../home/style.scss'],

})

export class SalaryComponent implements OnInit {
    salaries:any[] = [];
    loading:boolean;

    constructor(private router:Router, private salaryservice:SalaryService, private alertService:AlertService) {

    }

    ngOnInit() {
        this.loading = true;
        this.loadAllSalaries();

    }

    private loadAllSalaries() {
        this.salaryservice.getAll().subscribe(salaries => {
                console.log(salaries);
                this.loading = false;
                this.salaries = salaries
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

}