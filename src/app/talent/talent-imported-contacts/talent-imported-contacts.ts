import { Component, Input } from '@angular/core';
import { ProfileService } from '../../_services/profile.service';

@Component({
    selector: 'talent-imported-contacts',
    templateUrl: 'talent-imported-contacts.html',
    styleUrls: ['talent-imported-contacts.scss']
})

export class TalentImportedContactsComponent {

    constructor(private _profileService: ProfileService) {}

    @Input()
    importedContacts: any;

    @Input()
    loading: any;

    openImportContactsModal() {
        $("#importContactsModal").modal('show');
    }
}