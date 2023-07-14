import { Component } from '@angular/core';
import { ImportContactsService } from '../_services/import-contacts.service';
import { Router } from '@angular/router';
import { ProfileService } from '../_services/profile.service';
import * as hello from 'hellojs/dist/hello.all.js';

declare var gapi: any;

@Component({
    selector: 'import-contacts',
    templateUrl: 'import-contacts.component.html',
    styleUrls: ['import-contacts.component.scss']
})

export class ImportContactsComponent {

    constructor(private _importContactsService: ImportContactsService,
                private router: Router,
                private _profileService:ProfileService) {}

    auth2: any;
    gmailContacts: any;
    validGmailContacts = [];
    selectedGmailContacts = [];

    outlookContacts: any = [];
    validOutlookContacts = [];
    selectedOutlookContacts = [];

    importSuccess: boolean = false;

    ngOnInit() {
        console.log('import', this._importContactsService.gmailInformation);
        this.gmailContacts = this._importContactsService.gmailInformation;
        this.outlookContacts = this._importContactsService.outlookInformation;
        console.log("on init out", this.outlookContacts);
        this.getValidGmailContacts();
        this.getValidOutlookContacts();
    }

    getValidGmailContacts() {
        if(this.gmailContacts.connections) {
            for(let i = 0; i < this.gmailContacts.connections.length; i++) {
                if(this.gmailContacts.connections[i].names && this.gmailContacts.connections[i].emailAddresses) {
                    this.validGmailContacts.push(this.gmailContacts.connections[i])
                    console.log("aqui aqui")
                }
            }

            console.log("Valid contacts", this.validGmailContacts);
        }
    }

    selectGmailContact(index, name, email) {
        // this.selectedContacts.push()
        let selectedContact = {
            index: index,
            name: name,
            email: email,
        }

        this.selectedGmailContacts.push(selectedContact);
        console.log("select", this.selectedGmailContacts);
    }

    unselectGmailContact(index) {
        this.selectedGmailContacts = this.selectedGmailContacts.filter(res => {
            return res.index != index;
        })

        console.log("remove", this.selectedGmailContacts);
    }

    openImportContactsModal() {
        this.router.navigate(['/profiles']);
        $("#importContactsModal").modal('show');
    }

    deselectAllGmailContacts() {
        this.selectedGmailContacts = [];
    }

    selectAllGmailContacts() {
        this.selectedGmailContacts = [];
        let name;
        let email;
        for(let i = 0; i < this.validGmailContacts.length; i++) {
            console.log("entra")
            if(this.validGmailContacts[i].names && this.validGmailContacts[i].emailAddresses) {
                name = this.validGmailContacts[i].names[0].displayName;
                email = this.validGmailContacts[i].emailAddresses[0].value;
                let selectedContact = {
                    index: i,
                    name: name,
                    email: email
                }
                this.selectedGmailContacts.push(selectedContact)
            } else {
                return;
            }
        }
        console.log("for", this.selectedGmailContacts);
    }

    getSelectedContact(contactIndex) {
        for(let i = 0; i < this.selectedGmailContacts.length; i++) {
            if(this.selectedGmailContacts[i].index === contactIndex) {
                return true
            }
        }
        return false;
    }

    /*  OUTLOOK Contacts   */

    getValidOutlookContacts() {
        if(this.outlookContacts) {
            console.log(" entra al for")
            for(let i = 0; i < this.outlookContacts.length; i++) {
                if(this.outlookContacts[i].DisplayName && this.outlookContacts[i].EmailAddresses.length > 0) {
                    this.validOutlookContacts.push(this.outlookContacts[i])
                }
            }

            console.log("Valid contacts", this.validOutlookContacts);
        }
    }

    getSelectedOutlookContact(contactIndex) {
        for(let i = 0; i < this.selectedOutlookContacts.length; i++) {
            if(this.selectedOutlookContacts[i].index === contactIndex) {
                return true
            }
        }
        return false;
    }

    selectOutlookContact(index, name, email) {
        // this.selectedContacts.push()
        let selectedContact = {
            index: index,
            name: name,
            email: email,
        }

        this.selectedOutlookContacts.push(selectedContact);
        console.log("select", this.selectedOutlookContacts);
    }

    unselectOutlookContact(index) {
        this.selectedOutlookContacts = this.selectedOutlookContacts.filter(res => {
            return res.index != index;
        })

        console.log("remove", this.selectedOutlookContacts);
    }

    selectAllOutlookContacts() {
        this.selectedOutlookContacts = [];
        let name;
        let email;
        for(let i = 0; i < this.validOutlookContacts.length; i++) {
            console.log("entra")
            if(this.validOutlookContacts[i].DisplayName && this.validOutlookContacts[0].EmailAddresses[0].Address) {
                name = this.validOutlookContacts[i].DisplayName
                email = this.validOutlookContacts[i].EmailAddresses[0].Address;
                let selectedContact = {
                    index: i,
                    name: name,
                    email: email
                }
                this.selectedOutlookContacts.push(selectedContact)
            } else {
                return;
            }
        }
        console.log("for", this.selectedOutlookContacts);
    }

    deselectAllOutlookContacts() {
        this.selectedOutlookContacts = [];
    }

    submitImportContacts() {
        // let selectedGmailContacts = JSON.parse(this.selectedGmailContacts);
        this._importContactsService.importContacts(this.selectedGmailContacts).subscribe(res => {
            console.log("importados!", res);
            this.importSuccess = true;
            setTimeout(() => {
                this.importSuccess = false;
            }, 6000);
        }, err => {
            console.log("error", err);
        })
    }

    submitImportOutlookContacts() {
        this._importContactsService.importContacts(this.selectedOutlookContacts).subscribe(res => {
            console.log("importados!", res);
            this.importSuccess = true;
            setTimeout(() => {
                this.importSuccess = false;
            }, 6000);
        }, err => {
            console.log("error", err);
        })
    }

    importContactsState() {
        this._profileService.importedContactsState = true;
    }

}