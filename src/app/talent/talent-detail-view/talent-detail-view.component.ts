import { Component } from '@angular/core';
import { ProfileService } from "../../_services/profile.service";
import { Profile } from "../../_models/index";
import { ActivatedRoute } from "@angular/router";
import { Message } from "primeng/primeng";
import { AlertService, AuthenticationService, CartService } from "../../_services/index";
import { Router} from "@angular/router";
import { Location } from '@angular/common';
// , NavigationEnd, NavigationStart, Event 
@Component({
    selector: 'talent-detail-view',
    templateUrl: 'talent-detail-view.component.html',
    styleUrls: ['talent-detail-view.scss']
})

export class TalentDetailviewComponent {

    constructor(private profileService:ProfileService,
                private route:ActivatedRoute,
                private alertService:AlertService,
                private authenticationService:AuthenticationService,
                private router: Router) {}

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

    languages: any;
    projects: any;

    // Load data ones componet is ready
    ngOnInit() {
        this.currentUser = this.authenticationService.getUser();
        // Subscribe to route params
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadAllRelated();
            // Retrieve Pet with Id route param
            this.profileService.getById(this.id).subscribe(profile => {
                // User is redirected to profiles/id if owns === false
                if(profile.owns === false) {
                    this.router.navigate(['/profiles', this.id])
                }
                this.profile = profile
                console.log(this.profile)
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