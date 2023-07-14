import { Component, Output, EventEmitter, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ImportContactsService } from '../../_services/import-contacts.service';
import * as hello from 'hellojs/dist/hello.all.js';

declare var gapi: any;

@Component({
    selector: 'import-contacts-modal',
    templateUrl: 'import-contacts-modal.component.html',
    styleUrls: ['import-contacts-modal.scss']
})

export class ImportContactsModalComponent {

    constructor(private router: Router,
                private _importContactsService: ImportContactsService,
                private zone: NgZone) {}

    auth2: any;
    contactsFile: any;
    fileErrorMessage: string;
    fileSuccesMessage: string;

    @Output()
    importContactsEvent = new EventEmitter<any>();

    ngOnInit() {
        setTimeout(() => this.initGapiClient(), 1000);
        this.microsoftInit();
    }

    initGapiClient() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '764371843517-agq21liaq9vbspiroidokg1lbfmvrqdk.apps.googleusercontent.com',
                cookie_policy: 'single_host_origin',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            });
            // this.auth2.attachClickHandler(document.getElementById('gmailbutton'), {}, this.initClient, this.onFailure);
        })
    }

    onFailure (err) {
        console.log(err);
    }

    initClient() {
        // alert("skkds");
        console.log("initClient")
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: 'AIzaSyDvWcoDpok4DyzMq4Btdu2vRmnLwQTbmUU',
                discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                clientId: '764371843517-agq21liaq9vbspiroidokg1lbfmvrqdk.apps.googleusercontent.com',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            }).then(() => {
                // alert("Hhhoos");
                console.log("Hhoss");
                return gapi.client.people.people.connections.list({
                    resourceName:'people/me',
                    personFields: 'emailAddresses,names'
                });
            }).then(
                (res) => {
                    // alert("c");
                    console.log("c");
                    // console.log("Res: " + JSON.stringify(res));
                    this._importContactsService.gmailInformation = res.result;
                    console.log("en modal", this._importContactsService.gmailInformation.totalItems);
                    $("#importContactsModal").modal('hide');
                    setTimeout(() => {
                        if(!this._importContactsService.gmailInformation.connections ) {
                            $("#contactsNotFound").modal({
                                backdrop: 'static'
                            });
                        } else {
                            $("#confirmationContactModal").modal({
                                backdrop: 'static'
                            });
                        }
                    }, 1000);

                    // console.log("prueba", res.result.connections[0].emailAddresses[0].value)
                    
                    //this.userContacts.emit(this.transformToMailListModel(res.result));
                },
                error => console.log("ERROR " + JSON.stringify(error))
            );
        })
    }

    apiClick() {
        // this.initClient();
        // this.auth2.signIn().then(res => {
        //     this.initClient();
        // },
        // err => {
        //     console.log("error", err);
        // })
        this.auth2.signIn().then(res => {
            this.initClient();
        },
        err => {
            console.log("error", err);
        })
    }

    goToImportContacts() {
        $("#confirmationContactModal").modal('hide');
        this.router.navigate(['/import-contacts']);
    }

    cancelImportContacts() {
        this._importContactsService.gmailInformation = null;
    }

    microsoftInit() {
        hello.init({
            windows: 'a19c5ea0-d7fa-450e-88b8-be826b603825',
        }, {redirect_uri: 'http://localhost:4200'})
    }

    microsoftLogin() {
        hello('windows').login({scope: 'friends, email'}).then((auth) => {
            console.log("logueado");
            let windowsToken = JSON.parse(localStorage.getItem('hello'))
            windowsToken = windowsToken.windows.access_token;
            console.log("token", windowsToken);
            this._importContactsService.getOutlookContacts(windowsToken).subscribe(res => {
                console.log("res obs", res);
                if(!res.value || res.value.lenth == 0) {
                    $("#importContactsModal").modal('hide');
                    setTimeout(() => {
                        $("#contactsNotFound").modal({
                            backdrop: 'static'
                        });
                    }, 1000);
                } else {
                    this._importContactsService.outlookInformation = res.value;
                    $("#importContactsModal").modal('hide');
                    setTimeout(() => {
                        $("#confirmationContactModal").modal({
                            backdrop: 'static'
                        });   
                    }, 1000);
                }
            }, err => {
                console.log("err", err);
            })
        }), error => {
            console.log("errror", error)
        }
    }

    importByDocument() {
        $("#importContactsModal").modal('hide');
        setTimeout(() => {
            $("#importByDocument").modal('show'); 
        }, 1000);
    }

    contactsChange(evt) {
        const files = evt.target.files;
        console.log("files", files)
        if (files.length > 0) {
            let file;
            let formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                console.log("entra al for")
                file = files[i];
                formData.append('file', file, file.name);
            }
            this.contactsFile = formData;
            console.log("change", this.contactsFile);
            // this._authenticationService.me().subscribe(res => {
            //     // this.pk = res.profile_id
            //     this._candidatePersonalInformationService.resume(this.resume, this.pk).subscribe(res => {
            //         console.log("resume", res)
            //         // this.msgs = [];
            //         // this.msgs.push({ severity: 'info', summary: '', detail: 'Has subido tu CV.' });
            //     })
            // })
        }


    }

    submitContactsFile() {
        this._importContactsService.importContactsFile(this.contactsFile).subscribe(res => {
            console.log("exito", res)
            this.fileErrorMessage = null;
            this.fileSuccesMessage = 'Archivo importado correctamente!'
        }, err => {
            console.log("error", err)
            this.fileSuccesMessage = null;
            this.fileErrorMessage = 'Ha ocurrido un error al importar el archivo!'
        })
    }

}