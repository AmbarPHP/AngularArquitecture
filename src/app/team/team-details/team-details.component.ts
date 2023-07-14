import { Component } from '@angular/core';
import { TeamService } from '../../_services/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'team-details',
    templateUrl: 'team-details.component.html',
    styleUrls: ['team-details.component.scss']
})

export class TeamDetailsComponent {

    constructor(private _teamService: TeamService,
                private activatedRoute: ActivatedRoute) {}

    profiles = this._teamService.profiles;
    profile: any;
    zourcingMembers: any;

    ngOnInit() {
        this.getProfile();
        this.getZourcingMembers();
    }
    
    getProfile() {
        this.activatedRoute.params.subscribe(res => {
            let id = res.id;
            let profile = this.profiles.filter(profile => profile.id == id);
            this.profile = profile[0];
            console.log("Prof", this.profile);
        })
    }

    getZourcingMembers() {
        this.activatedRoute.params.subscribe(res => {
            let id = res.id;
            let profiles = this.profiles.filter(profiles => profiles.id != id);
            this.zourcingMembers = profiles;
            console.log("Zourcing profiles", this.zourcingMembers);
        })
    }
}