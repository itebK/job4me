import { Component, OnInit } from '@angular/core';
import {EntrepriseService} from '../../services/user/entreprise.service';
import {CandidatService} from '../../services/user/candidat.service';
import {Utilisateur} from '../../models/User/utilisateur.model';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../services/user/utilisateur.service';
import {isNullOrUndefined, isUndefined} from 'util';
import {Md5} from 'ts-md5/dist/md5';
import {CvEnLigneService} from '../../services/cv/cvEnLigne.service';
import {Document} from '../../models/candidat/document.model';
import {Candidat} from '../../models/User/candidat.model';

@Component({
  selector: 'app-insccrption',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  types: String[] = ['Candidat' , 'Entreprise'] ;
  useremail: Utilisateur ;
  utilisateur: Utilisateur = new  Utilisateur ;
  cvenligne: Document = new Document ;
  candidat: Candidat = new Candidat ;
  errorMail: number = 0 ;
  constructor(public entrepriseservice: EntrepriseService ,
              public router: Router ,
              public utilisateurservice: UtilisateurService,
              public cvenligneservice: CvEnLigneService,
              public candidatservice: CandidatService) {
    this.cvenligne.candidat = this.candidat ;
    this.cvenligne.nom_document = 'cvenligne' ;

  }

  ngOnInit() {

  }

  onSaveUser(dataForm) {
    this.utilisateur = dataForm ;

    /*----------------- Verifier l'existance de l'email saisie--------------*/
    this.utilisateurservice.allUser()
      .subscribe(data2 => {
          this.useremail = data2.find(findEmail) ;


    /*----------------- Ajouter utilisateur aprés vérification--------------*/

    if (isNullOrUndefined(this.useremail ) ) {
      dataForm.password =  Md5.hashStr(dataForm.password) ;
    if (dataForm.role === 'Candidat') {
      this.candidatservice.addCandidat(dataForm)
        .subscribe(data => {
            this.cvenligne.candidat.idUtilisateur = data.idUtilisateur ;
            this.cvenligneservice.addCvEnLigne(this.cvenligne)
              .subscribe(data1 => {
                console.log(data1) ;
              }, err => {
                console.log(err); }) ;
            this.candidatservice.addmsg() ;
            this.router.navigate(['/connexion']); },
          err => {console.log(err); }) ;
    } else {
      this.entrepriseservice.addEntreprise(dataForm)
        .subscribe(data => {
            this.router.navigate(['/connexion']) ;
          },
          err => {console.log(err); }) ; }
    } else {
      this.errorMail = 1 ;
    }
      }, err => {console.log(err); }) ;

    /*----------------- Comparaison entre l'email d'un objet Utilisateur et l'email saisie--------------*/
    function findEmail(utilisateur) {
      return utilisateur.email === dataForm.email ;
    }
  }



}
