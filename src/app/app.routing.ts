import { VacancyDetailComponent } from './vacancy/recruiter/vacancy-detail/vacancy-detail.component';
import { VacancyDetailCandidateComponent } from './vacancy/candidate/vacancy-detail-candidate/vacancy-detail-candidate.component';
import { MyApplicationsComponent } from './vacancy/candidate/my-applications/my-applications.component';
import { FaqComponent } from './intro/faq/faq.component';
import { RecruiterGuard } from './_guards/recruiter.guard';
import { TermsConditionsComponent } from './info/terms-conditions/terms-conditions/terms-conditions.component';
import { AboutComponent } from './info/about/about/about.component';
import { PrivacyPolicyComponent } from './info/privacy-policy/privacy-policy/privacy-policy.component';
import { IntroCandidateComponent } from './intro/intro-candidate/intro-candidate.component';
import {

    RegisterCandidateComponent,

} from "./register/index";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/index";
import { LoginComponent, LoginCallbackComponent } from "./login/index";
import { RegisterRecruiterComponent } from "./register/index";
import { AuthGuard } from "./_guards/index";
import { VacancyComponent, VacancyCandidateComponent } from './vacancy/index';
import { CheckoutComponent } from "./cart/index";
import { ChatComponent } from "./chat/index";
import {
    ProfileDetailViewComponent,
    SocialProfileComponent,
    ProfileListViewComponent,
    ProfilesComponent
} from "./profile/index";
import { SalaryComponent } from "./salary/index";
import { IntroComponent } from "./intro/intro.component";
import { TalentComponent } from "./talent/talent.component";
import { TalentDetailviewComponent } from "./talent/talent-detail-view/talent-detail-view.component";
import { CartComponent } from "./cart/cart.component";
import { MyAccountComponent } from './my-account/my-account.component';
import { VacancyLeftFiltersCandidateMobileComponent } from './vacancy/candidate/vacancy-left-filters-candidate-mobile/vacancy-left-filters-candidate-mobile.component';
import { IframeComponent } from './iframe/iframe.component';
import { TeamComponent } from './team/team.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { IframeVacanciesComponent } from './iframe/iframe-vacancies/iframe-vacancies.component';
import { IframeWizardComponent } from './iframe/iframe-wizard/iframe-wizard.component';
import { EstadisticasComponent } from './iframe/iframe-estadisticas/estadisticas.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { ImportContactsComponent } from './import-contacts/import-contacts.component';
import { SignupComponent } from './signup/signup.component';
import { FAQComponent } from './faq/faq.component';
import { MembershipComponent } from './membership/membership.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'landing', redirectTo: 'login', pathMatch: 'full' },
    { path: 'authlogin/callback', component: LoginCallbackComponent },
    { path: 'login', component: IntroComponent },
    { path: 'login-candidate', component: IntroCandidateComponent },
    { path: 'landing-candidate', component: IntroCandidateComponent },
    { path: 'register/candidate', component: RegisterCandidateComponent, canActivate: [AuthGuard] },
    { path: 'register/recruiter', component: RegisterRecruiterComponent, canActivate: [AuthGuard] },
    { path: 'vacancies', component: VacancyComponent },
    { path: 'vacancies/:id', component: VacancyDetailComponent },
    { path: 'vacancies-candidate', component: VacancyCandidateComponent },
    { path: 'vacancies-candidate/:id', component: VacancyDetailCandidateComponent },
    { path: 'my-applications', component: MyApplicationsComponent },
    { path: 'talent', component: TalentComponent, canActivate: [AuthGuard] },
    { path: 'talent/:id', component: TalentDetailviewComponent, canActivate: [AuthGuard] },
    { path: 'profiles', component: ProfilesComponent, canActivate: [RecruiterGuard] },
    { path: 'profiles/list', component: ProfileListViewComponent },
    { path: 'profiles/:id', component: ProfileDetailViewComponent},
    { path: 'cart', component: CartComponent },
    { path: 'cart/checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'salaries', component: SalaryComponent, canActivate: [AuthGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
    { path: 'terms', component: TermsConditionsComponent },
    { path: 'privacy', component: PrivacyPolicyComponent, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FAQComponent },
    { path: 'memberships', component: MembershipComponent },
    { path: 'account', component: MyAccountComponent },
    { path: 'iframe', component: IframeComponent },
    { path: 'team', component: TeamComponent },
    { path: 'team/:id', component: TeamDetailsComponent },
    { path: 'iframe-vacancies', component: IframeVacanciesComponent },
    { path: 'iframe-wizard', component: IframeWizardComponent },
    { path: 'reports', component: EstadisticasComponent },
    { path: 'login-module', component: LoginModuleComponent },
    { path: 'import-contacts', component: ImportContactsComponent },
    { path: 'signup', component: SignupComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'landing' }
];

export const routing = RouterModule.forRoot(appRoutes);
