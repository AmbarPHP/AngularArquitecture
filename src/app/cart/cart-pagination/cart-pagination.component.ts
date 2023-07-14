import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PagerService } from "../../_services/index";
import { ProfileService } from '../../_services/profile.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
    selector: 'cart-pagination',
    templateUrl: 'cart-pagination.component.html',
    styleUrls: ['cart-pagination.component.scss']
})

export class CartPaginationComponent {

    constructor(private pagerService: PagerService,
                private _profileService: ProfileService) {

    }

    @Input()
    pager: any;

    @Input()
    profiles: any;

    @Input()
    pages: any;

    @Input()
    total: any;

    @Input()
    pagedItems: any;

    @Output()
    sendPaginationEvent: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        console.log("profiles", this.profiles);
        console.log("pagedItems", this.pagedItems);
        console.log("total", this.total);
    }

    ngAfterViewInit() {
        console.log("aqui view init");
        console.log("total", this.total);
    }

    sendPagination(page) {
        console.log("Page", page)
        this.sendPaginationEvent.emit(page)
    }

    setPage(page:number) {
        // this.loading = true;
        
        // get pager object from service
        this.pager = this.pagerService.getPager(this.total, page, this.pagerService.profileCardsQty);
        console.log("pagination", this.pager)
        // localStorage.setItem('profilesLastPageNumber', page.toString());
        this._profileService.searchProfile.page = page;
        // get current page of items
        this.pagedItems = this.profiles.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.sendPagination(page);
        // this.loading = false;


        if (page < 1 || page > this.pager.totalPages) {
            // this.loading = false;
            return;
        }


    }
}