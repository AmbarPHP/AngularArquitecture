import { Component } from '@angular/core';

@Component({
    selector: 'faq-component',
    templateUrl: 'faq.component.html',
    styleUrls: ['faq.component.scss']
})

export class FAQComponent {

    estrellaPerfil: boolean = false;
    zourcingPerfil: boolean = false;
    zourcearPerfil: boolean = false;
    restablecerPassword: boolean = false;
    forgotPassword: boolean = false;
    closeAccount: boolean = false;
    duracionVacantes: boolean = false;
    contactoFaq: boolean = false;


    estrellaPerfilToggle() {
        console.log("Test")
        this.estrellaPerfil = !this.estrellaPerfil;
    }

    zourcingPerfilToggle() {
        this.zourcingPerfil = !this.zourcingPerfil;
    }

    zourcearPerfilToggle() {
        this.zourcearPerfil = !this.zourcearPerfil;
    }

    restablecerPasswordToggle() {
        this.restablecerPassword = !this.restablecerPassword;
    }

    forgotPasswordToggle() {
        this.forgotPassword = !this.forgotPassword;
    }

    closeAccountToggle() {
        this.closeAccount = !this.closeAccount;
    }

    duracionVacantesToggle() {
        this.duracionVacantes = !this.duracionVacantes;
    }

    contactoFaqToggle() {
        this.contactoFaq = !this.contactoFaq;
    }
}