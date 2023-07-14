import { Component, OnInit } from "@angular/core";
import { VacancyService } from "../../../_services/vacancy.service";
import { ActivatedRoute } from "@angular/router";
import { Message } from "primeng/primeng";
import { AlertService, AuthenticationService, CartService } from "../../../_services/index";
import { Router } from "@angular/router";

@Component({
    selector: 'vacancy-detail',
    templateUrl: 'vacancy-detail.component.html',
    styleUrls: ['vacancy-detail.component.scss']
})
export class VacancyDetailComponent {
    related_profiles: any;
    // Private properties for binding
    private sub: any;
    loading: boolean = true;
    listView: boolean = false;
    vacancy: any = [];
    currentUser: any;
    msgs: Message[] = [];
    id: any;
    search_skills: any;
    data: any;
    contactInformation: any;
    positionInfo: boolean = true;
    selectedProfiles: any = [];
    boughtProfilesSelected: any = [];
    interestedProfilesSelected: any = [];
    associatedProfilesSelected: any = [];
    showDeleteApplicantsInterestedModal = false;
    showDeleteApplicantsBoughtModal = false;
    showDeleteApplicantsAssociatedModal = false;
    showDeleteVacancyModal = false;
    interestedProfilesToBeRemoved: any;
    boughtProfilesToBeRemoved: any;
    associatedProfilesToBeRemoved: any;
    vacancyToBeDeleted: any;
    laodingApplicants: boolean = false;
    userType: any;
    // optionSelected can be "bought", "interested" or "associated"
    optionSelected: any = "bought";

    constructor(private router: Router, private _vacancyService: VacancyService, private route: ActivatedRoute, private alertService: AlertService, private cartService: CartService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.getUser();
        this.getVacancyById();
        this.authenticationService.getType.subscribe(res => {
            this.userType = res;
        });
    }

    getVacancyById() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this._vacancyService.get(this.id).subscribe(vacancy => {
                this.vacancy = vacancy;
                console.log(this.vacancy)
                this.loading = false;
                this.laodingApplicants = false;
                this.contactInformation = this.vacancy[0].contact_information; 
            });
        });
    }

    getPositionInfo(positionInfo: boolean) {
        this.positionInfo = positionInfo;
    }

    getOptionSelected(event: string) {
        this.optionSelected = event;
        console.log(this.optionSelected)
    }


    getBuyProfile(event: number) {
        console.log("current", this.currentUser)
        console.log("id", event)
        if (this.currentUser) {
            this.cartService.addProfile(this.currentUser, event).subscribe(() => {
                this.router.navigate(['/cart/checkout']);
            },
                error => {
                });
        } else {
            this.msgs = [];
            this.msgs.push({ severity: 'danger', summary: '', detail: 'Debes iniciar sesión para comprar.' });

        }
    }

    getAssociatedProfilesSelected(event) {
        this.associatedProfilesSelected.push(event);
        console.log("associated", this.associatedProfilesSelected);
    }

    getAssociatedProfilesUnchecked(event) {
        this.removeSelectedProfile(this.associatedProfilesSelected, event);
        console.log("associated", this.associatedProfilesSelected);
    }

    getDeselectAllAssociated(event) {
        this.associatedProfilesSelected = event;
        console.log("deselect", this.associatedProfilesSelected);
    }

    getInterestedProfilesSelected(event) {
        this.interestedProfilesSelected.push(event);
        console.log("interested", this.interestedProfilesSelected);
    }

    getInterestedProfilesUnchecked(event) {
        this.removeSelectedProfile(this.interestedProfilesSelected, event);
        console.log("interested", this.interestedProfilesSelected);
    }

    getDeselectAllInterested(event) {
        this.interestedProfilesSelected = event;
        console.log("deselect", this.interestedProfilesSelected);
    }
    
    getBoughtProfilesSelected(event) {
        this.boughtProfilesSelected.push(event);
        console.log("bought", this.boughtProfilesSelected);
    }
    
    getBoughtProfilesUnchecked(event) {
        this.removeSelectedProfile(this.boughtProfilesSelected, event);
        console.log("bought", this.boughtProfilesSelected);
    }
    
    getDeselectAllBought(event) {
        this.boughtProfilesSelected = event;
        console.log("deselect", this.boughtProfilesSelected);
    }
    
    removeSelectedProfile(arr, what) {
        let found = arr.indexOf(what);

        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }

    deleteInterestedApplicants(interestedProfilesToBeRemoved) {
        this.laodingApplicants = true;
        for(let i = 0; i < interestedProfilesToBeRemoved.interestedProfilesSelected.length; i++) {
            this._vacancyService.deleteApplicant(interestedProfilesToBeRemoved.vacancy, interestedProfilesToBeRemoved.interestedProfilesSelected[i]).subscribe(res => {
                console.log("borrado", res)
                this.showDeleteApplicantsInterestedModal = false;
                this.getVacancyById();
            },
            err => {
                console.log(err);
            })
        }
        this.interestedProfilesSelected = [];
        
    }

    deleteBoughtApplicants(boughtProfilesToBeRemoved) {
        this.laodingApplicants = true;
        for(let i = 0; i < boughtProfilesToBeRemoved.boughtProfilesSelected.length; i++) {
            this._vacancyService.deleteApplicant(boughtProfilesToBeRemoved.vacancy, boughtProfilesToBeRemoved.boughtProfilesSelected[i]).subscribe(res => {
                console.log("borrado", res)
                this.showDeleteApplicantsBoughtModal = false;
                this.getVacancyById();
            },
            err => {
                console.log(err);
            })
        }
    }

    deleteAssociatedApplicants(associatedProfilesToBeRemoved) {
        this.laodingApplicants = true;
        console.log("length", associatedProfilesToBeRemoved.associatedProfilesSelected.length)
        console.log("array", associatedProfilesToBeRemoved.associatedProfilesSelected)
        for(let i = 0; i < associatedProfilesToBeRemoved.associatedProfilesSelected.length; i++) {
            this._vacancyService.deleteAssociatedProfile(associatedProfilesToBeRemoved.vacancy, associatedProfilesToBeRemoved.associatedProfilesSelected[i]).subscribe(res => {
                console.log("borrado", res)
                this.showDeleteApplicantsAssociatedModal = false;
                this.associatedProfilesSelected = []
                this.getVacancyById();
            },
            err => {
                console.log(err);
            })
        }
    }

    getDeleteInterestedApplicants(event) {
        this.interestedProfilesToBeRemoved = event;
        this.showDeleteApplicantsInterestedModal = true;
    }

    getDeleteBoughtApplicants(event) {
        this.boughtProfilesToBeRemoved = event;
        this.showDeleteApplicantsBoughtModal = true;
    }

    getDeleteAssociatedApplicants(event) {
        console.log("get", event)
        this.associatedProfilesToBeRemoved = event;
        this.showDeleteApplicantsAssociatedModal = true;
    }

    getDeleteVacancyModal(event) {
        $("#deleteVacancyModal").modal('toggle');
        this.vacancyToBeDeleted = event;
    }
    
    deleteVacancy(vacancyId: number) {
        console.log("siii")
        this._vacancyService.delete(vacancyId).subscribe(res => {
            console.log("exito", res);
            $("#deleteVacancyModal").modal('toggle');
            this.router.navigate(['/vacancies']);
        }, err => {
            console.log(err);
        })
    }

    getEditVacancy(event) {
        console.log("details", event)
        $("#editModal").modal('toggle');
    }

    getVacancyEdited(event) {
        this.getVacancyById();
    }

    getChangeView(event) {
        this.listView = event;
        console.log(this.listView);
    }

}
