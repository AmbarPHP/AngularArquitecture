import { Component } from '@angular/core';
import { TeamService } from '../_services/team.service';

@Component({
    selector: 'team',
    templateUrl: 'team.component.html',
    styleUrls: ['team.component.scss']
})

export class TeamComponent {

    constructor(private _teamService: TeamService) {}

    profiles: any = this._teamService.profiles;
}