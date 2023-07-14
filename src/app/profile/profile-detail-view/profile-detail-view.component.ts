import {Component, OnInit} from "@angular/core";
import {ProfileService} from "../../_services/profile.service";
import {Profile} from "../../_models/index";
import {ActivatedRoute} from "@angular/router";
import {Message} from "primeng/primeng";
import {AlertService, AuthenticationService, CartService} from "../../_services/index";
import {Router} from "@angular/router";

@Component({
    selector: 'profile-detail-view',
    templateUrl: 'profile-detail-view.component.html',
    styleUrls: ['profile-detail-view.scss']
})

export class ProfileDetailViewComponent {

    related_profiles: any;
    // Private properties for binding
    private sub:any;
    private profile:Profile;
    profiles:Profile[] = [];
    loading:boolean = true;
    currentUser:any;
    msgs:Message[] = [];
    id:any;
    search_skills:any;
    data:any;
    contactInfo: boolean = true;
    socialSource: string;

    languages: any;
    projects: any;

    constructor( private profileService:ProfileService, private route:ActivatedRoute, private alertService:AlertService, private authenticationService:AuthenticationService) {

        this.data = {
            labels: ['Coincidencia', ''],
            datasets: [
                {
                    data: [Math.floor(Math.random() * 100) + 50, Math.floor(Math.random() * 20) + 1],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                    ]
                }]
        };
    }

    hire() {
        this.profileService.buyById(this.id).subscribe(profile => {
                this.profile = profile;
                this.msgs = [];
                this.msgs.push({severity: 'success', summary: '', detail: 'Perfil comprado exitosamente.'});
            }
        );
    }

    email() {
        this.profileService.sendProfileEmail(this.id);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: '', detail: 'Email enviado exitosamente.'});


    }


    pdf() {
        this.profileService.sendProfilePdf(this.id);
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: '', detail: 'Pdf descargado exitosamente.'});

    }


    // Load data ones componet is ready
    ngOnInit() {
        this.currentUser = this.authenticationService.getUser();
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadAllRelated();
            // Retrieve Pet with Id route param
            this.profileService.getById(this.id).subscribe(profile => {
                this.profile = profile
                this.socialSource = this.profile.source;
                this.loading = false;
                this.languages = this.profile.achievements.filter(achievements => {
                    return achievements.pd_type === "language"
                })
                this.projects = this.profile.achievements.filter(projects => {
                    return projects.pd_type === "projects"
                })
            });
            
        });
    }


    loadAllRelated() {
        this.profileService.getAllRelated(this.id).subscribe(related_profiles => {
                this.related_profiles = related_profiles;
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
        this.sub.unsubscribe();
    }
}