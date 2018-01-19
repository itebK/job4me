import { Candidat } from './../../models/User/candidat.model';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurService} from '../../services/user/utilisateur.service';
import {Utilisateur} from '../../models/User/utilisateur.model';
import { Entreprise } from '../../models/User/model.entreprise';
import { OffreService } from '../../services/entreprise/offre.service';
import {Md5} from 'ts-md5/dist/md5';
import {CandidatService} from '../../services/user/candidat.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  public  msg: any ;
  user: Utilisateur = new Utilisateur  ;

  constructor(public router: Router ,
              public utilisateurservice: UtilisateurService,
              public candidatservice: CandidatService,
              public offreservices: OffreService) {
  }

  ngOnInit() {

    this.candidatservice.msginscription.subscribe(
      data => {this.msg = data ; } , err => {
        console.log(err); }) ;

  }


  authentification (dataForm ) {

    this.utilisateurservice.authentification(dataForm.email , Md5.hashStr(dataForm.password))
      .subscribe(data => {

        this.user = data ;

        if (this.user) {
          localStorage.setItem('email', this.user.email.toString());
          localStorage.setItem('role', this.user.role.toString());
          localStorage.setItem('id', this.user.idUtilisateur.toString());
          if (localStorage.getItem('role') === 'Candidat') {
            this.offreservices.listeOffres();
            this.router.navigateByUrl('/home');
          } else if (localStorage.getItem('role') === 'Entreprise') {
            this.router.navigateByUrl('/profile-entreprise');
          } else {
            this.router.navigateByUrl('/admin');
          }
        }
      }, err => {
                    this.user = null ;
                    console.log(err); }) ;


    }

}
