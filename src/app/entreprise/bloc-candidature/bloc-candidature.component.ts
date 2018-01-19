import { Component, OnInit } from '@angular/core';
import {CandidatureService} from '../../../services/Candidat/candidature.service';
import {Postuler} from '../../../models/candidat/postuler.model';
import {Experience} from '../../../models/cv/experience.model';
import {Certification} from '../../../models/cv/certification.model';
import {Formation} from '../../../models/cv/formation.model';
import {FormationService} from '../../../services/cv/formation.service';
import {CertificationService} from '../../../services/cv/certification.service';
import {ExperienceService} from '../../../services/cv/experience.service';
import {CvEnLigneService} from '../../../services/cv/cvEnLigne.service';
import {CvEnLigne} from '../../../models/cv/cv_en_ligne.model';
import {PostulerService} from '../../../services/Candidat/postuler.service';

@Component({
  selector: 'app-bloc-candidature',
  templateUrl: './bloc-candidature.component.html',
  styleUrls: ['./bloc-candidature.component.css']
})
export class BlocCandidatureComponent implements OnInit {

  listeCandidature: Postuler [] = [] ;
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
              public experienceservices: ExperienceService ) { }

  ngOnInit() {
    this.candidatureservice.getCandidatureEntreprise(1)
      .subscribe(data => {
        for (const c of data) {
          if (c.document.type === 'CV') {
          this.listeCandidature.push(c);
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
    if (!this.listeCandidature[index].vue) {
      this.listeCandidature[index].vue = true;
      this.postulerservices.updatepostuler(this.listeCandidature[index], this.listeCandidature[index].candidature.idCandidature,
        this.listeCandidature[index].document.idDocument)
        .subscribe(data => {
          console.log(this.listeCandidature[index].vue);
        }, err => {
          console.log(err);
        });
    }



  }

  removeCandidature(index: number) {
    this.candidatureservice.deleteCandidature(this.listeCandidature[index].candidature.idCandidature)
      .subscribe(data => {this.listeCandidature.splice(index, 1); } ,
        err => {console.log(err); });


  }


  archiverCandidature(index: number) {
    this.listeCandidature[index].candidature.archive = true ;
    this.candidatureservice.editCandidature(this.listeCandidature[index].candidature.idCandidature
      , this.listeCandidature[index].candidature)
      .subscribe(data => {
          this.listeCandidature.splice(index, 1);
          this.candidatureservice.getcandidatureArchiverEntreprise(1)
            .subscribe(data1 => {
              this.listeArchiveCandidature = data1 ;
            }, err => {
              console.log(err); }) ;
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
