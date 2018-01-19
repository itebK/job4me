import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { TagInputModule } from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilterComponent } from './bloc-filter/filter.component';
import { BlocSuggestionComponent } from './bloc-suggestions/bloc-suggestion.component';
import { BlocEntrepriseComponent } from './bloc-entreprises/bloc-entreprise.component';
import { BlocOffresComponent } from './bloc-offres/bloc-offres.component';
import { BlocProfileComponent } from './bloc-profile/bloc-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { OffreComponent } from './offre/offre.component';
import { AccueilComponent } from './accueil/accueil.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BlocDescEntrepriseComponent } from './bloc-desc-entreprise/bloc-desc-entreprise.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { BlocCvComponent } from './bloc-cv/bloc-cv.component';
import { BlocLettreComponent } from './bloc-lettre/bloc-lettre.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ExperienceService} from '../services/cv/experience.service';
import {CvEnLigneService} from '../services/cv/cvEnLigne.service';
import {FormationService} from '../services/cv/formation.service';
import {CertificationService} from '../services/cv/certification.service';
import {CandidatureService} from '../services/Candidat/candidature.service';
import {FavorisCandidatService} from '../services/Candidat/favorisCandidat.service' ;
import {OffreService} from '../services/entreprise/offre.service';
import {CompetenceService} from '../services/entreprise/competence.service';
import {FilterPipe} from './pipes/offre.pipe';
import {CandidatService} from '../services/user/candidat.service';
import {PieceJointeService} from '../services/Candidat/pieceJointe.service';
import {PostulerService} from '../services/Candidat/postuler.service';
import {EntrepriseService} from '../services/user/entreprise.service';
import {EqualValidator} from '../directive/equalValidator.directive';
import {UtilisateurService} from '../services/user/utilisateur.service';
import {Utilisateur} from '../models/User/utilisateur.model';
import { BlocCandidatureComponent } from './entreprise/bloc-candidature/bloc-candidature.component';
import { BlocConsulterComponent } from './entreprise/bloc-consulter/bloc-consulter.component';
import { AccueilEntrepriseComponent } from './entreprise/accueil-entreprise/accueil-entreprise.component';
import { BlocArchiveComponent } from './entreprise/bloc-archive/bloc-archive.component';
import { LoginGuard } from './login.guard';
import { LocalStorageClass } from './localStorageClass';
import { BlocCompteComponent } from './admin/bloc-compte/bloc-compte.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import {TypeContratService} from '../services/entreprise/typeContrat.service';
import {PosteService} from '../services/entreprise/post.service';
import { Ng2UploaderModule } from 'ng2-uploader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    FilterComponent,
    BlocSuggestionComponent,
    BlocEntrepriseComponent,
    BlocOffresComponent,
    BlocProfileComponent,
    ProfileComponent,
    EntreprisesComponent,
    OffreComponent,
    FilterPipe,
    AccueilComponent,
    BlocDescEntrepriseComponent,
    ConnexionComponent,
    InscriptionComponent,
    BlocCvComponent,
    EqualValidator,
    BlocLettreComponent,
    BlocCandidatureComponent,
    BlocConsulterComponent,
    AccueilEntrepriseComponent,
    BlocArchiveComponent,
    BlocCompteComponent,
    AccueilAdminComponent
  ],
  imports: [
    BrowserModule,
    Ng2UploaderModule,
    routing,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    TagInputModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    ExperienceService,
    CandidatService,
    Utilisateur,
    OffreService,
    CvEnLigneService,
    FormationService,
    EntrepriseService,
    CertificationService,
    CandidatureService,
    CompetenceService,
    UtilisateurService,
    PieceJointeService,
    PosteService,
    TypeContratService,
    PostulerService,
    FavorisCandidatService,
    LoginGuard,
    LocalStorageClass
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
