import { Experience } from '../../models/cv/experience.model';
import { Competence } from '../../models/cv/Competence.model';
import { Certification } from '../../models/cv/certification.model';
import { Formation } from '../../models/cv/formation.model';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {ExperienceService} from '../../services/cv/experience.service';
import {CvEnLigne} from '../../models/cv/cv_en_ligne.model';
import {CvEnLigneService} from '../../services/cv/cvEnLigne.service' ;
import {FormationService} from '../../services/cv/formation.service';
import {CertificationService} from '../../services/cv/certification.service';
import {CandidatureService} from '../../services/Candidat/candidature.service';
import {FavorisCandidatService} from '../../services/Candidat/favorisCandidat.service';
import {PostulerService} from '../../services/Candidat/postuler.service';
import {Postuler} from '../../models/candidat/postuler.model';
import {Utilisateur} from '../../models/User/utilisateur.model';
import {UtilisateurService} from '../../services/user/utilisateur.service';
import {CandidatService} from '../../services/user/candidat.service';
import {Md5} from 'ts-md5/dist/md5';
import { LocalStorageClass } from '../localStorageClass';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  classTab: string = 'tab-nav-profile';
  classTabInput: string = 'tab-input-profile';
  utilisateur: Utilisateur = new Utilisateur () ;
  experience: Experience ;
  cv_en_ligne: CvEnLigne = new CvEnLigne ;
  competence: Competence;
  certification: Certification;
  formation: Formation;
  apropos: string = '';
  aproposContent = '';
  msg: string;


  listeExperience: Experience[] = [];
  listeCompetence: Competence[] = [];
  listePostuler: Postuler[] = [];
  listeCertification: Certification[] = [];
  listeFormation: Formation[] = [];
  listeFavoris: any[] = [];


  /* MODAL IMAGE */
  modalRef: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /* AJOUTER APROPOS */
  addApropos() {
    this.cv_en_ligne.apropos = this.apropos ;
    this.cvenligneservices.editCvEnLigne(this.cv_en_ligne , this.cv_en_ligne.idDocument)
      .subscribe(data => {},
        err => {console.log(err); }) ;
    this.aproposContent = this.apropos;
  }

  removeApropos() {
    this.cv_en_ligne.apropos = '' ;
    this.cvenligneservices.editCvEnLigne(this.cv_en_ligne , this.cv_en_ligne.idDocument)
      .subscribe(data => {},
        err => {console.log(err); }) ;
    this.aproposContent = '';
  }

  /* AJOUTER - REMOVE EXPERIENCE */
  addExperience() {



    const entry = {
      'idExperience': null,
      'poste_occupe': this.experience.poste_occupe,
      'duree': this.experience.duree,
      'description': this.experience.description,
      'cvEnLigne': this.cv_en_ligne,
    };
    this.experienceservices.saveExperience(entry)
                           .subscribe(data => {entry.idExperience = data.idExperience ; },
                                      err => {console.log(err); }) ;
    this.listeExperience.push(entry);
    this.experience.poste_occupe = '';
    this.experience.duree = '';
    this.experience.description = '';
  }

  removeExperience(index) {
    this.experienceservices.deletetExperience(this.listeExperience[index])
                           .subscribe(data => {this.listeExperience.splice(index, 1); } ,
                             err => {console.log(err); });

  }

    /* AJOUTER - REMOVE COMPETENCE */

  addCompetence() {
    const entry = {
      'idCompetence': null,
      'competence': this.competence.competence,
      'niveau': this.competence.niveau,
      'cvEnLigne': this.cv_en_ligne
    };
    this.listeCompetence.push(entry);
    this.cv_en_ligne.competences = this.listeCompetence ;
    // console.log(this.cv_en_ligne.competences) ;
    this.cvenligneservices.editCvEnLigne(this.cv_en_ligne , this.cv_en_ligne.idDocument) ;
    // console.log(this.cv_en_ligne) ;
    this.competence.competence = '';
    this.competence.niveau = '';
  }

  removeCompetence(index) {
    this.listeCompetence.splice(index, 1);
  }

    /* AJOUTER - REMOVE CERTIFICATION */

   addCertification() {
    const entry = {
      'idCertification': null,
      'certification': this.certification.certification,
      'annee': this.certification.annee,
      'cvEnLigne': this.cv_en_ligne
    };
     this.certificationservices.saveCertification(entry)
       .subscribe(data => {entry.idCertification = data.idCertification ; },
         err => {console.log(err); });
    this.listeCertification.push(entry);
    this.certification.certification = '';
    this.certification.annee = '';
  }

  removeCertification(index) {
    this.certificationservices.deletetCertification(this.listeCertification[index])
      .subscribe(data => {this.listeCertification.splice(index, 1); } ,
        err => {console.log(err); }) ;

  }

    /* AJOUTER - REMOVE FORMATION */

  addFormation() {
    const entry = {
      'idFormation': null,
      'etablissement': this.formation.etablissement,
      'specialite': this.formation.specialite,
      'diplome': this.formation.diplome,
      'annee': this.formation.annee,
      'cvEnLigne': this.cv_en_ligne
    };
    this.formationservices.saveFormation(entry)
      .subscribe(data => {entry.idFormation = data.idFormation ; },
        err => {console.log(err); }) ;
    this.listeFormation.push(entry);
    this.formation.etablissement = '';
    this.formation.specialite = '';
    this.formation.diplome = '';
    this.formation.annee = '';
  }

  removeFormation(index) {
    this.formationservices.deletetFormation(this.listeFormation[index])
      .subscribe(data => {this.listeFormation.splice(index, 1); } ,
        err => {console.log(err); }) ;

  }

  constructor(
    public localS: LocalStorageClass,
    private modalService: BsModalService ,
    public experienceservices: ExperienceService ,
    public cvenligneservices: CvEnLigneService ,
    public formationservices: FormationService ,
    public certificationservices: CertificationService ,
    public candidatureservices: CandidatureService ,
    public candidatservices: CandidatService ,
    public utilisateurservices: UtilisateurService ,
    public favoriscandidatservices: FavorisCandidatService) {
    this.experience = new Experience('', '', '', '');
    this.competence = new Competence();
    this.certification = new Certification('', '');
    this.formation = new Formation('', '', '', '');
  }
  /*  REMOVE Candidature */

  removeCandidature(index) {
    this.candidatureservices.deleteCandidature(this.listePostuler[index].candidature.idCandidature)
      .subscribe(data => {this.listePostuler.splice(index, 1); } ,
        err => {console.log(err); });

    }

  /*  REMOVE Offre Favoris */
  removeFavoris(index) {
    this.favoriscandidatservices.deletefavorisCandidat(this.listeFavoris[index].candidat.idUtilisateur ,
      this.listeFavoris[index].offre.idOffre                    )
      .subscribe(data => {this.listeFavoris.splice(index, 1); } ,
        err => {console.log(err); });

  }


  /*          Update Profile Candidat           */

  UpdateCandidat(dataForm) {
    console.log(dataForm) ;

    dataForm.password =  Md5.hashStr(dataForm.password) ;
    this.candidatservices.updateCandidat(dataForm , Number(localStorage.getItem('id'))).
    subscribe(data => {
      this.utilisateur = data;
      this.msg = 'success';
     } ,
      err => {console.log(err); });
  }


  ngOnInit() {
    /*****************Utilisateur***********/
    this.utilisateurservices.getUser(Number(localStorage.getItem('id')))
      .subscribe(data1 => {this.utilisateur = data1 ; } ,
        err => {console.log(err); }) ;
    /* récuperer id cv_en_ligne du candidat */
    this.cvenligneservices.getCvCandidatById(Number(localStorage.getItem('id')))
      .subscribe(data => {this.cv_en_ligne = data;
      this.aproposContent = this.cv_en_ligne.apropos ;

    /* Liste des experiences du candidat */
    this.listeExperience = this.getExperiences(this.cv_en_ligne.idDocument) ;

    /* Liste des certifications du candidat */
    this.listeCertification = this.getCertification(this.cv_en_ligne.idDocument) ;


    /* Liste des offres favoris du candidat */
    this.listeCompetence = this.getCompetences(Number(localStorage.getItem('id'))) ;

    /* Liste des Formations du candidat */
    this.listeFormation = this.getFormation(this.cv_en_ligne.idDocument) ;

        } ,
        err => {console.log(err); }) ;

    /* Liste des candidatures du candidat */
    this.listePostuler = this.getCandidature(Number(localStorage.getItem('id'))) ;

    /* Liste des offres favoris du candidat */
    this.listeFavoris = this.getOffreFavoris(Number(localStorage.getItem('id'))) ;


  }





  getExperiences (idCvEnLigne: number): Experience[] {
    this.experienceservices.listeExperienceCandidat(idCvEnLigne)
      .subscribe(data1 => {this.listeExperience = data1 ; } ,
        err => {console.log(err); }) ;
    return this.listeExperience;
  }

  getCertification (idCvEnLigne: number): Certification[] {
    this.certificationservices.listeCertificationCandidat(this.cv_en_ligne.idDocument)
      .subscribe(data1 => {this.listeCertification = data1 ; } ,
        err => {console.log(err); });
    return this.listeCertification;
  }

  getCompetences (id: number): Competence [] {
    this.cvenligneservices.getCvCandidatById(Number(localStorage.getItem('id')))
      .subscribe(data => {
          for (const c of data.competences) {
            this.listeCompetence.push(c);
          }
      } ,
        err => {console.log(err); });
    return this.listeCompetence  ;
}

  getFormation (idCvEnLigne: number): Formation[] {
    this.formationservices.listeFormationCandidat(this.cv_en_ligne.idDocument)
      .subscribe(data1 => {this.listeFormation = data1 ; } ,
        err => {console.log(err); });
    return this.listeFormation;
  }
  getCandidature (id: number): Postuler []  {
    this.candidatureservices.getCandidatureCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {
          for (const c of data) {
            if (c.document.type === 'CV') {
              this.listePostuler.push(c);
            }
          }
      } ,
        err => {console.log(err); }) ;
    return this.listePostuler  ;
  }



  getOffreFavoris (id: number): any [] {
    this.favoriscandidatservices.getfavorisCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {this.listeFavoris = data ; } ,
        err => {console.log(err); });
    return this.listeFavoris  ;
  }

    }
