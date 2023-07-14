import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { ForgotPasswordService } from './_services/forgot-password.service';
import { FaqComponent } from './intro/faq/faq.component';
import { CandidateConctactInfoService } from './_services/candidate/contact-info';
import { RecruiterGuard } from './_guards/recruiter.guard';
import { TermsConditionsComponent } from './info/terms-conditions/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './info/privacy-policy/privacy-policy/privacy-policy.component';
import { AboutComponent } from './info/about/about/about.component';
import { CandidateLanguageService } from './_services/candidate/languages';
import { CandidateEducationService } from './_services/candidate/education';
import { CandidatePersonalInfoService } from './_services/candidate/personal-info';
import { RecruiterPersonalInformationService } from './_services/recruiter/personal-info';
import { RecruiterCompanyService } from './_services/recruiter/company';
import { CandidateSkillsService } from './_services/candidate/skills';
import { CandidateWorkExperienceService } from './_services/candidate/work-experience';
import { LocationService } from './_services/location.service';
import { RegisterCandidateWorkExperienceComponent } from './register/register-candidate/register-candidate-work-experience/register-candidate-work-experience.component';
import { RegisterCandidateStudiesComponent } from './register/register-candidate/register-candidate-studies/register-candidate-studies.component';
import { IntroCandidateComponent } from './intro/intro-candidate/intro-candidate.component';
import { SubscriberService } from './_services/subscriber.service';
import { RegisterSubscriberComponent } from './register/register-subscriber/register-subscriber.component';
import { IntroComingSoonModalComponent } from './intro/intro-coming-soon-modal/intro-coming-soon-modal.component';
import { IntroAutocompleteInputComponent } from './intro/intro-autocomplete-input/intro-autocomplete-input.component';
import { LocationAutocompleteComponent } from './components/location-autocomplete/location-autocomplete.component';
import { CountryListComponent } from './_helpers/countrylist/countrylist.component';
import { NgModule } from '@angular/core';
import {TooltipModule} from 'primeng/primeng';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend } from '@angular/http/testing';
import { WizardModule } from 'ng2-archwizard';
import { TagInputModule } from 'ngx-chips';
import { FilterPipe, VacancyFilterPipe, VacancyPostedByFilterPipe } from './_pipes/filterpipe.component';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/index';
import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import { TabsModule } from 'ngx-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './_guards/index';
import {
    MyAccountComponent,
    MyAccountRecruiterHeaderComponent,
    MyAccountRecruiterInformationComponent,
    MyAccountRecruiterPreferencesComponent,
    MyAccountCandidateHeaderComponent,
    MyAccountCandidateInformationComponent,
    MyAccountCandidateEducationComponent,
    MyAccountCandidateWorkExperienceComponent,
    MyAccountCandidateLanguagesComponent,
    MyAccountCandidateContactInfoComponent,
    MyAccountCandidatePreferencesComponent,
    MyAccountCandidateSkillsComponent,
    MyAccountRecruiterMembershipComponent,
    MyAccountRecruiterPaymentMethod
} from './my-account/index';

import {
    AlertService,
    AuthenticationService,
    CartService,
    MessageService,
    PagerService,
    ProfileService,
    SalaryService,
    UserService,
    VacancyService
} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginCallbackComponent, LoginComponent } from './login/index';
import {
    RegisterRecruiterComponent,
    RegisterRecruiterHeaderComponent,
    RegisterRecruiterFirstComponent,
    RegisterRecruiterSecondComponent,
    RegisterCandidateComponent,
    RegisterCandidateContactInfoComponent,
    RegisterCandidateHeaderComponent,
    RegisterCandidatePersonalComponent,
    RegisterCandidateLanguagesComponent,
    RegisterCandidateSkillsComponent,
} from './register/index';
import { CartComponent, CheckoutComponent, CheckoutHeaderComponent, CheckoutPaymentInformationComponent, CheckoutProfilesComponent, PipelineHeaderComponent, PipelinePriceComponent, PipeLineCardViewComponent, CartPaginationComponent } from './cart/index';
import {
    VacancyDetailComponent,
    VacancyAddModalComponent,
    VacancySuccessVacancyModalComponent,
    VacancyCardViewComponent,
    VacancyComponent,
    VacancyDeleteModalComponent,
    VacancyFiltersComponent,
    VacancyHeaderComponent,
    VacancyListViewComponent,
    VacancyPaginationComponent,
    VacancyDetailViewCardComponent,
    VacancyCandidateComponent,
    VacancyDetailCandidatesHeaderComponent,
    VacancyDetailCandidatesCardComponent,
    VacancyDetailCandidatesCardBoughtComponent,
    VacancyDetailCandidatesCardInterestedComponent,
    VacancyDetailCandidatesCardAssociatedComponent,
    VacancyDetailHeaderMobile,
    VacancyDetailCandidateComponent,
    VacancyDetailCandidateViewCardComponent,
    VacancyDetailCandidateDetailsComponent,
    VacancyDetailCandidateSimilarComponent,
    VacancyDetailCandidatesListBoughtComponent,
    VacancyDetailCandidatesListInterestedComponent,
    VacancyDetailCandidatesListAssociatedComponent,
    VacancyHeaderCandidateComponent,
    VacancyTopFiltersCandidateComponent,
    VacancyLeftFiltersCandidateComponent,
    VacancyLeftFiltersCandidateMobileComponent,
    VacancyCardViewCandidateComponent,
    VacancyListViewCandidateComponent,
    VacancyPaginationCandidateComponent,
    VacancyDetailEditModalComponent,
    DeleteVacancyModalComponent,
    MyApplicationsComponent,
    MyApplicationsHeaderComponent,
    MyApplicationsMainFilterComponent,
    MyApplicationsCardViewComponent
} from './vacancy/index';
import { SalaryComponent } from './salary/index';
import {
    ProfileCardViewComponent,
    ProfileDetailViewComponent,
    ProfileDetailViewCardComponent,
    ProfileWorkExperienceCardComponent,
    ProfileSimilarProfilesCardComponent,
    ProfileDetailMenuComponent,
    ProfileHeaderComponent,
    ProfileLeftFiltersComponent,
    ProfileListViewComponent,
    ProfileMainFilterComponent,
    ProfilePaginationComponent,
    ProfilesComponent,
    ProfileFiltersMobileComponent,
    ProfileMainFilterMobile,
    SocialProfileComponent
} from './profile/index';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Ng2CompleterModule } from 'ng2-completer';
import {
    ButtonModule,
    ChartModule,
    CheckboxModule,
    DataTableModule,
    DropdownModule,
    FieldsetModule,
    GrowlModule,
    ProgressBarModule,
    SelectButtonModule
} from 'primeng/primeng';
import { GlobalVars } from './_helpers/globals';
import { IntroComponent } from './intro/intro.component';
import { IntroLoginModalComponent } from './intro/intro-login-modal/intro-login-modal.component';

import { ForgotPasswordModalComponent } from './intro/forgot-password-modal/forgot-password-modal';

import { TalentComponent } from './talent/talent.component';
import { TalentListViewComponent } from './talent/talent-list-view/talent-list-view.component';
import { TalentHeaderComponent } from './talent/talent-header/talent-header.component';
import { TalentFilterComponent } from './talent/talent-filter/talent-filter.component';
import { TalentCardViewComponent } from './talent/talent-card-view/talent-card-view.component';
import { TalentDetailviewComponent } from './talent/talent-detail-view/talent-detail-view.component';
import { TalentDetailMenuComponent } from './talent/talent-detail-view/talent-detail-menu/talent-detail-menu.component';
import { TalentDetailViewCardComponent } from './talent/talent-detail-view/talent-detail-view-card/talent-detail-view-card.component';
import { TalentWorkExperienceCardComponent } from './talent/talent-detail-view/talent-work-experience-card/talent-work-experience-card.component';
import { TalentSimilarProfilesCard } from './talent/talent-detail-view/talent-similar-profiles-card/talent-similar-profiles-card.component';
import { TalentImportedContactsComponent } from './talent/talent-imported-contacts/talent-imported-contacts';
import { TeamComponent } from './team/team.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { TeamService } from './_services/team.service';

import { IframeComponent } from './iframe/iframe.component';
import { IframeVacanciesComponent } from './iframe/iframe-vacancies/iframe-vacancies.component';
import { IframeService } from './_services/iframe.service';
import { IframeWizardComponent } from './iframe/iframe-wizard/iframe-wizard.component';
import { IframeWizardPersonalComponent } from './iframe/iframe-wizard/iframe-wizard-personal/iframe-wizard-personal.component';
import { IframeWizardWorkExperienceComponent } from './iframe/iframe-wizard/iframe-wizard-work-experience/iframe-wizard-work-experience.component';
import { EstadisticasComponent } from './iframe/iframe-estadisticas/estadisticas.component';
import { ImportContactsModalComponent } from './components/import-contacts-modal/import-contacts-modal.component';
import { ImportContactsComponent } from './import-contacts/import-contacts.component';
import { ImportContactsService } from './_services/import-contacts.service';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { StarRatingModule } from 'angular-star-rating';

// Shared Components
import { ProfileCardsQtyComponent } from './components/profileCardsQty/profileCardsQty.component';
import { SocialIconsComponent } from './components/shared/profiles-card-view-components/social-icons/social-icons.component';
import { ProfileDescriptionComponent } from './components/shared/profiles-card-view-components/profile-description/profile-description.component';
import { MoreDescriptionBtnComponent } from './components/shared/profiles-card-view-components/more-description-btn/more-description-btn.component';
import { ContactPhoneEmailComponent } from './components/shared/profiles-card-view-components/contact-phone-email/contact-phone-email.component';

// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

// used to create fake backend

// fix aot
import { ForgotPasswordComponent } from './login/forgot-password.component';

import { LoginModuleComponent } from './login-module/login-module.component';
import { FeedbackService } from './_services/feedback.service';

import { SignupComponent } from './signup/signup.component';

import { mixpanelTrackerService } from './_services/mixpanelTracker.service';

import { FAQComponent } from './faq/faq.component';
import { MembershipService } from './_services/membership.service';
import { CreditConfirmationModalComponent } from './profile/profile-modals/credit-confirmation-modal.component';
import { MembershipComponent } from './membership/membership.component';

import { CreditCardDirective } from './_directives/credit-card/credit-card.directive';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        TooltipModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        DataTableModule,
        DropdownModule,
        SelectButtonModule,
        ButtonModule,
        GrowlModule,
        ChartModule,
        ProgressBarModule,
        FieldsetModule,
        CheckboxModule,
        WizardModule,
        Ng2CompleterModule,
        StarRatingModule.forRoot(),
        NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 40,
            outerStrokeWidth: 4,
            innerStrokeWidth: 2,
            outerStrokeColor: '#a0c0ff',
            innerStrokeColor: '#99ccff',
            animation: true,
            showSubtitle: false,
            animationDuration: 100
        }),
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        TabsModule.forRoot(),
        NgxJsonLdModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        LoginCallbackComponent,
        CountryListComponent,
        MembershipComponent,
        RegisterCandidateComponent,
        RegisterCandidateSkillsComponent,
        RegisterCandidateStudiesComponent,
        RegisterCandidatePersonalComponent,
        RegisterCandidateWorkExperienceComponent,
        RegisterCandidateHeaderComponent,
        RegisterCandidateContactInfoComponent,
        RegisterCandidateLanguagesComponent,
        RegisterRecruiterComponent,
        RegisterRecruiterHeaderComponent,
        RegisterRecruiterFirstComponent,
        RegisterRecruiterSecondComponent,
        VacancyComponent,
        VacancyDetailComponent,
        VacancyHeaderComponent,
        VacancyFiltersComponent,
        VacancyPostedByFilterPipe,
        VacancyCardViewComponent,
        VacancyPaginationComponent,
        VacancyDeleteModalComponent,
        VacancyAddModalComponent,
        VacancySuccessVacancyModalComponent,
        VacancyListViewComponent,
        VacancyDetailViewCardComponent,
        VacancyCandidateComponent,
        VacancyDetailCandidatesHeaderComponent,
        VacancyDetailCandidatesCardComponent,
        VacancyDetailCandidatesCardBoughtComponent,
        VacancyDetailCandidatesCardInterestedComponent,
        VacancyDetailCandidatesCardAssociatedComponent,
        VacancyDetailHeaderMobile,
        VacancyDetailCandidateComponent,
        VacancyDetailCandidateViewCardComponent,
        VacancyDetailCandidateDetailsComponent,
        VacancyDetailCandidateSimilarComponent,
        VacancyHeaderCandidateComponent,
        VacancyTopFiltersCandidateComponent,
        VacancyLeftFiltersCandidateComponent,
        VacancyLeftFiltersCandidateMobileComponent,
        VacancyCardViewCandidateComponent,
        VacancyListViewCandidateComponent,
        VacancyPaginationCandidateComponent,
        VacancyDetailEditModalComponent,
        DeleteVacancyModalComponent,
        VacancyDetailCandidatesListBoughtComponent,
        VacancyDetailCandidatesListInterestedComponent,
        VacancyDetailCandidatesListAssociatedComponent,
        MyApplicationsComponent,
        MyApplicationsHeaderComponent,
        MyApplicationsMainFilterComponent,
        MyApplicationsCardViewComponent,
        ProfileDetailViewComponent,
        ProfileListViewComponent,
        ProfileCardViewComponent,
        ProfilesComponent,
        ProfileHeaderComponent,
        ProfileMainFilterComponent,
        ProfileLeftFiltersComponent,
        ProfilePaginationComponent,
        ProfileDetailViewCardComponent,
        ProfileWorkExperienceCardComponent,
        ProfileSimilarProfilesCardComponent,
        ProfileDetailMenuComponent,
        ProfileFiltersMobileComponent,
        ProfileMainFilterMobile,
        TalentComponent,
        TalentListViewComponent,
        TalentHeaderComponent,
        TalentFilterComponent,
        TalentCardViewComponent,
        TalentDetailviewComponent,
        TalentDetailMenuComponent,
        TalentDetailViewCardComponent,
        TalentWorkExperienceCardComponent,
        TalentSimilarProfilesCard,
        TalentImportedContactsComponent,
        SocialProfileComponent,
        SalaryComponent,
        CartComponent,
        CartPaginationComponent,
        CheckoutComponent,
        CheckoutHeaderComponent,
        CheckoutPaymentInformationComponent,
        CheckoutProfilesComponent,
        PipelineHeaderComponent,
        PipelinePriceComponent,
        PipeLineCardViewComponent,
        ChatComponent,
        IntroComponent,
        IntroCandidateComponent,
        IntroAutocompleteInputComponent,
        LocationAutocompleteComponent,
        RegisterSubscriberComponent,
        IntroLoginModalComponent,
        ForgotPasswordModalComponent,
        IntroComingSoonModalComponent,
        // providers used to create fake backend
        TermsConditionsComponent,
        AboutComponent,
        FaqComponent,
        PrivacyPolicyComponent,
        FilterPipe,
        VacancyFilterPipe,
        MyAccountComponent,
        MyAccountRecruiterHeaderComponent,
        MyAccountRecruiterInformationComponent,
        MyAccountRecruiterPreferencesComponent,
        MyAccountCandidateHeaderComponent,
        MyAccountCandidateInformationComponent,
        MyAccountCandidateEducationComponent,
        MyAccountCandidateWorkExperienceComponent,
        MyAccountCandidateLanguagesComponent,
        MyAccountCandidateContactInfoComponent,
        MyAccountCandidatePreferencesComponent,
        MyAccountCandidateSkillsComponent,
        MyAccountRecruiterMembershipComponent,
        MyAccountRecruiterPaymentMethod,
        // Components that can be re-used
        ProfileCardsQtyComponent,
        IframeVacanciesComponent,
        IframeComponent,
        TeamComponent,
        TeamDetailsComponent,
        IframeWizardComponent,
        IframeWizardPersonalComponent,
        IframeWizardWorkExperienceComponent,
        EstadisticasComponent,
        ForgotPasswordComponent,
        LoginModuleComponent,
        ImportContactsModalComponent,
        ImportContactsComponent,
        FeedbackModalComponent,
        SignupComponent,
        FAQComponent,
        SocialIconsComponent,
        ProfileDescriptionComponent,
        MoreDescriptionBtnComponent,
        ContactPhoneEmailComponent,
        CreditConfirmationModalComponent,
        CreditCardDirective

    ],
    providers: [
        AuthGuard,
        RecruiterGuard,
        AlertService,
        AuthenticationService,
        UserService,
        VacancyService,
        FeedbackService,
        ProfileService,
        SalaryService,
        PagerService,
        CartService,
        SubscriberService,
        ForgotPasswordService,
        MessageService,
        CandidateWorkExperienceService,
        CandidateConctactInfoService,
        CandidateSkillsService,
        CandidatePersonalInfoService,
        CandidateLanguageService,
        CandidateEducationService,
        LocationService,
        BaseRequestOptions,
        MockBackend,
        fakeBackendProvider,
        GlobalVars,
        TranslateService,
        RecruiterPersonalInformationService,
        RecruiterCompanyService,
        IframeService,
        ImportContactsService,
        TeamService,
        MembershipService,
        mixpanelTrackerService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },

    ],
    exports: [
        TranslateModule
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
}
