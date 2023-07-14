import {Component, OnInit, AfterViewInit} from "@angular/core";
import {User} from "../_models/index";
import {UserService, AuthenticationService} from "../_services/index";
import {TranslateService} from '@ngx-translate/core';

@Component({
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit {
    currentUser:User;
    users:User[] = [];

    constructor(private userService:UserService, private authenticationService:AuthenticationService, public translate: TranslateService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngAfterViewInit() {

    }

    deleteUser(id:number) {
        this.userService.delete(id).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
        });
    }
}