import { Component, OnInit } from "@angular/core";
import "../../assets/app.css";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService, AlertService, AuthenticationService } from "../_services/index";
import { Profile } from "../_models/index";
import { GlobalVars } from "../_helpers/globals";
import { Constants } from "../_helpers/constants";
import { ProfileService } from "../_services/profile.service";
import { FormBuilder } from "@angular/forms";
import { mixpanelTrackerService } from '../_services/mixpanelTracker.service';

declare const ReconnectingWebSocket: any;
declare const jQuery: any;

@Component({
    selector: 'app',
    templateUrl: 'chat.component.html',
    styleUrls: ['./style.css'],

})
export class ChatComponent implements OnInit {
    profiles: Profile[] = [];
    loading: boolean;
    currentUser: any;
    messages: any = [];
    friends: any;
    chatsock: any;
    url: any;
    messageForm: any;
    filterString: any;

    constructor(private router: Router, private messageService: MessageService, private alertService: AlertService,
        private global: GlobalVars, private authenticationService: AuthenticationService, private profileService: ProfileService, fb: FormBuilder, private route: ActivatedRoute,
        private _mixpanelTrackerService: mixpanelTrackerService) {


        this.currentUser = this.authenticationService.getUser();

        this.messageForm = fb.group({
            'handle': this.currentUser.id,
            'message': '',

        })

    }

    hack(val) {
        return Array.from(val);
    }


    loadAllProfiles(owned = true, page = 1) {
        if (this.currentUser.type == 'candidate') {
            this.profileService.ownedBy().subscribe(profiles => {
                this.loading = false;
                this.profiles = profiles.rows;
            },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        } else {
            this.profileService.getAll(owned, page, 12).subscribe(profiles => {
                this.loading = false;
                this.profiles = profiles.rows;
            },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        }
    }


    getMessages(id) {
        this.loading = true;
        this.messageService.getAll(id).subscribe(messages => {
            this.loading = false;
            this.messages = messages;
        },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });


    }


    reconnectSocket(id) {

        // When we're using HTTPS, use WSS too.
        this.url = Constants.WS_ENDPOINT + 'chat/' + id + '/';
        this.chatsock = new ReconnectingWebSocket(this.url);
        this.chatsock.onmessage = (message) => {
            var data = JSON.parse(message.data);
            let m = {
                'formatted_timestamp': data.timestamp,
                'author_name': data.author_name,
                'profile_picture': this.currentUser.picture,
                'message': data.message
            };

            var objDiv = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.messages.push(m)

        };


    }

    send(form) {
        this.chatsock.send(JSON.stringify(form._value));
        jQuery("#message").val('').focus();
        return false;

    }

    conversationChange(profile) {
        console.log(profile)
        // If exists , close existing socket.
        if (this.chatsock) {
            this.chatsock.close();
            this.chatsock.removeEventListener();
        }

        var id = '';

        if (this.currentUser.type == 'candidate') {
            id = profile.profile_id + profile.id;
        } else {
            id = profile.id + this.currentUser.id;
        }

        this.reconnectSocket(id);
        this.getMessages(id)
    }

    conversationChangeWithParams(profile) {
        console.log(profile)
        // If exists , close existing socket.
        if (this.chatsock) {
            this.chatsock.close();
            this.chatsock.removeEventListener();
        }

        var id = '';
        //aun no esta listo el chat candidate
        if (this.currentUser.type == 'candidate') {
            id = profile.profile_id + profile.id;
        } else {
            id = profile
        }

        this.reconnectSocket(id);
        this.getMessages(id)
    }


    ngOnInit() {
        this.loadAllProfiles();
        this._mixpanelTrackerService.sendVisitedPage('Chat')
        this.route.params.subscribe(params => {
            let id = +params['id'] + this.currentUser.id;
            if (!id) {

            } else {
                this.conversationChangeWithParams(id);
            }
        })


    }


}