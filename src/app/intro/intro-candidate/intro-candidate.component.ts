import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService, AlertService, AuthenticationService } from "../../_services/index";
declare const $:any;
declare const ReconnectingWebSocket: any;

@Component({
    selector: 'intro-candidate',
    templateUrl: 'intro-candidate.component.html',
    styleUrls: ['../style.css'],
})
export class IntroCandidateComponent implements OnInit {
    type: string = "candidate";
    loading: boolean;
    currentUser: any;
    messages: any;
    friends: any;
    landing: boolean;
    modal: any;

    @Output()
    sendTypeEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router,private route: ActivatedRoute, private messageService: MessageService, private alertService: AlertService, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.modal = this.route.snapshot.queryParams['modal'] || '0';
        // this.type = 'candidate';
        // this.authenticationService.getType.emit(this.type);
        this.landing = true;
    }

    getCloseModal() {
        $("#signupModal").modal('toggle');
    }

    getCloseLoginModal() {
        $("#loginModal").modal('toggle');
    }



}