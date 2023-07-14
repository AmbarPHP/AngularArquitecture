import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import { CartService, ProfileService, VacancyService } from "../../../_services/index";
import { Message } from "primeng/primeng";
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
    selector: 'profile-detail-view-card',
    templateUrl: 'profile-detail-view-card.component.html',
    styleUrls: ['profile-detail-view-card.scss']
})

export class ProfileDetailViewCardComponent {

    msgs: Message[] = [];
    sendEmailTxt = '';
    hideModal = false;
    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasFacebookInformation: boolean;
    hasSkypeInformation: boolean;
    hasLinkedinInformation: boolean;
    hasGithubInformation: boolean;
    vacancies: any;
    previousUrl: any;

    constructor(private router: Router,
                private cartService: CartService,
                public _profileService: ProfileService,
                private location: Location,
                private _vacancyService: VacancyService,
                private _authenticationService: AuthenticationService) {

                }

    @Input()
    socialSource: string;
    
    @Input()
    profile: any;

    @Input()
    currentUser: any;

    ngOnInit() {
        console.log("Profile", this.profile)
        this.getHasTwitterAndWebsiteInformation();
        this.getAddToVacancyCombo();
        this.previousUrl = window.history.length;
    }

    buyProfile(profileId) {
        if (this.currentUser){
            this.cartService.addProfile(this.currentUser, profileId).subscribe(() => {
                    this.router.navigate(['/cart/checkout']);
            },
            error => {

            });
        } else {
            this.msgs = [];
            if (localStorage.getItem('userLanguage') === 'es') {
                this.msgs.push({ severity: 'danger', summary: '', detail: 'Debes iniciar sesión para comprar.' });
            } else {
                this.msgs.push({ severity: 'danger', summary: '', detail: 'Login to start buying profiles.' });
            }
        }
    }

    addToCart(profileId) {

        if (this.currentUser) {
            this.cartService.addProfile(this.currentUser, profileId).subscribe(() => {
                this.msgs = [];
                this.msgs.push({severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.'});
            },
            error => {

            });
        } else {
            this.cartService.addLocalProfile(this.profile.id);
            this.msgs = [];
            this.msgs.push({severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.'});
        }



    }

    emailProfile(profile_id, email) {
        this._profileService.sendProfileEmail(profile_id, email).subscribe(res => {
            console.log("email", res);
            this.sendEmailTxt = "";
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: '', detail: 'Email enviado exitosamente.'});
        },
        error => {
            console.log("error", error);
            this.msgs = [];
            this.msgs.push({severity: 'danger', summary: '', detail: 'Email no se pudo enviar'});
        })
    }

    profilePdf(profile_id) {
        this._profileService.sendProfilePdf(profile_id).subscribe(res => {
            console.log("pdf", res);
        },
        error => {
            console.log("error", error);
        })
    }

    getHasTwitterAndWebsiteInformation() {
        if (this.profile.contact_information.length > 0) {
            for (let i = 0; i < this.profile.contact_information.length; i ++) {
                if (this.profile.contact_information[i].pd_social_net === "twitter") {
                    this.hasTwitterInformation = true;
                }
                if (this.profile.contact_information[i].pd_social_net === "website") {
                    this.hasWebsiteInformation = true;
                }
                if (this.profile.contact_information[i].pd_social_net === "skype") {
                    this.hasSkypeInformation = true;
                }
                if (this.profile.contact_information[i].pd_social_net === "facebook") {
                    this.hasFacebookInformation = true;
                }
                if (this.profile.contact_information[i].pd_social_net === "linkedin") {
                    this.hasLinkedinInformation = true;
                }
                if (this.profile.contact_information[i].pd_social_net === "github") {
                    this.hasGithubInformation = true;
                }
            }
        }
    }

    goBack() {
        console.log("back", window.history.length);
        this.location.back();
    }

    getAddToVacancyCombo() {
        this._vacancyService.getAll().subscribe(res => {
            this.vacancies = res;
        })
    }

    associateToVacancy(vacancyId: number) {
        console.log('PerfilID', this.profile.id);
        console.log("vacancyId", vacancyId);
        this._vacancyService.associateProfileToVacancy(vacancyId, this.profile.id).subscribe(res => {
            console.log("exito", res);
            this.msgs = [];
            if (localStorage.getItem('userLanguage') === 'es') {
                this.msgs.push({severity: 'success', summary: '', detail: 'Usuario asociado a la vacante.'});
            } else {
                this.msgs.push({severity: 'success', summary: '', detail: 'User associated to the vacancy.'});
            }
        },
        err => {
            console.log(err);
            this.msgs = [];
            if (localStorage.getItem('userLanguage') === 'es') {
                this.msgs.push({severity: 'danger', summary: '', detail: 'La asociacion falló.'});
            } else {
                this.msgs.push({severity: 'danger', summary: '', detail: 'The associaton failed.'});
            }
        });
    }

    get isLoggedIn() {
        return this._authenticationService.isLoggedIn();
    }

}
