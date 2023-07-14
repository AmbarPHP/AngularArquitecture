import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import { CartService, ProfileService, VacancyService } from "../../../_services/index";
import { Location } from '@angular/common';

@Component({
    selector: 'talent-detail-view-card',
    templateUrl: 'talent-detail-view-card.component.html',
    styleUrls: ['talent-detail-view-card.scss']
})

export class TalentDetailViewCardComponent {
    facebookUrl: any;
    skypeUrl: any;
    vacancies: any;
    
    constructor(private _vacancyService: VacancyService, private router:Router, private cartService:CartService, private location: Location) {}

    hasTwitterInformation: boolean;
    hasWebsiteInformation: boolean;
    hasSkypeInformation: boolean;
    hasFacebookInformation: boolean;
    usernameTwitter: string;
    websiteUrl: string;
    

    @Input()
    profile: any;

    @Input()
    currentUser: any;

    ngOnInit() {
        this.getHasTwitterAndWebsiteInformation();
        this.getAddToVacancyCombo();        
    }

    buyProfile(profileId) {
        this.cartService.addProfile(this.currentUser, profileId).subscribe(() => {
                this.router.navigate(['/cart/checkout']);
        },
        error => {

        });
    }

    getAddToVacancyCombo() {
        this._vacancyService.getAll().subscribe(res => {
            this.vacancies = res;
        })
    }

    associateToVacancy(vacancyId: number) {
        this._vacancyService.associateProfileToVacancy(vacancyId, this.profile.id).subscribe(res => {
            console.log("exito", res)
        }, 
        err => {
            console.log(err);
        })
    }

    addToCart(profileId) {

        if (this.currentUser) {
            this.cartService.addProfile(this.currentUser, profileId).subscribe(() => {

            },
            error => {
            
            });
        } else {
            this.cartService.addLocalProfile(this.profile);
        }

        // this.msgs.push({severity: 'info', summary: '', detail: 'Perfil agregado al carrito exitosamente.'});


    }

    downloadResume() {
        window.location.href = this.profile.attachments[0].pd_attachment;
    }

    getHasTwitterAndWebsiteInformation() {
        if(this.profile.contact_information.length > 0) {
            for(let i = 0; i < this.profile.contact_information.length; i ++) {
                if(this.profile.contact_information[i].pd_social_net === "twitter") {
                    this.hasTwitterInformation = true;
                    this.usernameTwitter =  this.profile.contact_information[i].pd_contact;
                }
                if(this.profile.contact_information[i].pd_social_net === "website") {
                    this.hasWebsiteInformation = true;
                    this.websiteUrl =  this.profile.contact_information[i].pd_contact;
                }
                if(this.profile.contact_information[i].pd_social_net === "skype") {
                    this.hasSkypeInformation = true;
                    this.skypeUrl =  this.profile.contact_information[i].pd_contact;
                }
                if(this.profile.contact_information[i].pd_social_net === "facebook") {
                    this.hasFacebookInformation = true;
                    this.facebookUrl =  this.profile.contact_information[i].pd_contact;
                }
            }
        }
    }

    goBack() {
        this.location.back();
    }

    email() {
        console.log("email");
    }

    pdf() {
        console.log("pdf");
    }
}