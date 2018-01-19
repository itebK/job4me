import { Component, OnInit } from '@angular/core';
import {CandidatureService} from '../../../services/Candidat/candidature.service';
import {Postuler} from '../../../models/candidat/postuler.model';
import {FormationService} from '../../../services/cv/formation.service';
import {CertificationService} from '../../../services/cv/certification.service';
import {PostulerService} from '../../../services/Candidat/postuler.service';
import {CvEnLigneService} from '../../../services/cv/cvEnLigne.service';
import {ExperienceService} from '../../../services/cv/experience.service';
import {CvEnLigne} from '../../../models/cv/cv_en_ligne.model';
import {Experience} from '../../../models/cv/experience.model';
import {Certification} from '../../../models/cv/certification.model';
import {Formation} from '../../../models/cv/formation.model';

@Component({
  selector: 'app-bloc-archive',
  templateUrl: './bloc-archive.component.html',
  styleUrls: ['./bloc-archive.component.css']
})
export class BlocArchiveComponent implements OnInit {

  listeArchiveCandidature: Postuler [] = [] ;
  cv_en_ligne: CvEnLigne = new CvEnLigne ;
  listeExperience: Experience[] = [];
  listeCertification: Certification[] = [];
  listeFormation: Formation[] = [];
  apropos: string = '';
  nom: string = '' ;
  prenom: string = '' ;
  constructor(public candidatureservice: CandidatureService,
              public formationservices: FormationService ,
              public certificationservices: CertificationService ,
              public postulerservices: PostulerService ,
              public cvenligneservices: CvEnLigneService ,
              public experienceservices: ExperienceService) { }

  ngOnInit() {
    this.candidatureservice.getcandidatureArchiverEntreprise(1)
      .subscribe(data => {
        for (const c of data) {
          if (c.document.type === 'CV') {
            this.listeArchiveCandidature.push(c);
          }
        }
      }, err => {
        console.log(err); }) ;
  }

  CvCandidat(id: number , index: number) {
    this.cvenligneservices.getCvCandidatById(id)
      .subscribe(data => {this.cv_en_ligne = data;
          this.apropos = this.cv_en_ligne.apropos ;
          this.nom = data.candidat.nom ;
          this.prenom = data.candidat.prenom ;

          /* Liste des experiences du candidat */
          this.listeExperience = this.getExperiences(this.cv_en_ligne.idDocument) ;

          /* Liste des certifications du candidat */
          this.listeCertification = this.getCertification(this.cv_en_ligne.idDocument) ;


          /* Liste des Formations du candidat */
          this.listeFormation = this.getFormation(this.cv_en_ligne.idDocument) ;

          console.log(this.cv_en_ligne) ;

        } ,
        err => {console.log(err); }) ;

    if (!this.listeArchiveCandidature[index].vue) {
      this.listeArchiveCandidature[index].vue = true;
      this.postulerservices.updatepostuler(this.listeArchiveCandidature[index],
        this.listeArchiveCandidature[index].candidature.idCandidature,
        this.listeArchiveCandidature[index].document.idDocument)
        .subscribe(data => {
          console.log(this.listeArchiveCandidature[index].vue);
        }, err => {
          console.log(err);
        });
    }

  }

  removeCandidature(index: number) {

    this.candidatureservice.deleteCandidature(this.listeArchiveCandidature[index].candidature.idCandidature)
      .subscribe(data => {
        } ,
        err => {console.log(err); });
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

  getFormation (idCvEnLigne: number): Formation[] {
    this.formationservices.listeFormationCandidat(this.cv_en_ligne.idDocument)
      .subscribe(data1 => {this.listeFormation = data1 ; } ,
        err => {console.log(err); });
    return this.listeFormation;
  }



}
