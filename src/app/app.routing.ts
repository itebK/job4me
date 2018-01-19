import { AccueilComponent } from './accueil/accueil.component';
import { AccueilAdminComponent } from './admin/accueil-admin/accueil-admin.component';
import {AppComponent} from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EntreprisesComponent } from './entreprises/entreprises.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { OffreComponent } from './offre/offre.component';
import { ProfileComponent } from './profile/profile.component';
import { AccueilEntrepriseComponent } from './entreprise/accueil-entreprise/accueil-entreprise.component';
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginGuard } from './login.guard';



const appRoutes: Routes = [

    { path : '', component : AccueilComponent },
    { path : 'home', component : HomeComponent },
    { path : 'connexion', component : ConnexionComponent },
    { path : 'inscription', component : InscriptionComponent },
    { path : 'profile', component : ProfileComponent , canActivate: [LoginGuard]},
    { path : 'entreprises', component : EntreprisesComponent, canActivate: [LoginGuard]},
    { path : 'offre/:id', component : OffreComponent },
    { path : 'profile-entreprise', component : AccueilEntrepriseComponent },
    { path : 'admin', component : AccueilAdminComponent },
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
