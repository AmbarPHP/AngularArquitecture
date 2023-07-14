import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PagerService } from '../../../_services/index';

@Component({
    selector: 'vacancy-pagination',
    templateUrl: 'vacancy-pagination.component.html',
    styleUrls: ['vacancy-pagination.scss']
})

export class VacancyPaginationComponent {

    constructor(private pagerService: PagerService) {

    }

    @Input()
    pagination: any;

    @Input()
    vacancies: any;

    @Input()
    pagedItems: any;

    @Output()
    pagedItemsEmmiter: EventEmitter<any> = new EventEmitter();

    getPagedItemsEmmiter() {
        this.pagedItemsEmmiter.emit(this.pagedItems);
    }

    setPage(page:number) {
        // this.loading = true;
        if (page < 1 || page > this.pagination.totalPages) {
            return;
        }
        // get pager object from service
        this.pagination = this.pagerService.getPager(this.vacancies.length, page, 10);
        // get current page of items
        this.pagedItems = this.vacancies.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        // this.loading = false;
    }
}