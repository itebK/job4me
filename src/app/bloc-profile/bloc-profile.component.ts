import { Component, OnInit } from '@angular/core';
import {FavorisCandidatService} from '../../services/Candidat/favorisCandidat.service';
import { LocalStorageClass } from '../localStorageClass';
import { UtilisateurService } from '../../services/user/utilisateur.service';
import { Utilisateur } from '../../models/User/utilisateur.model';
import {Postuler} from '../../models/candidat/postuler.model';

@Component({
  selector: 'app-bloc-profile',
  templateUrl: './bloc-profile.component.html',
  styleUrls: ['./bloc-profile.component.css']
})
export class BlocProfileComponent implements OnInit {

  favoris: number = 0;
  favorisVue: number = 0 ;
  listcandidatureVue: Postuler[] = [] ;
  favorisNonVue: number = 0 ;
  listcandidatureNonVue: Postuler[] = [] ;
  utilisateur: Utilisateur = new Utilisateur () ;

  constructor(public utilisateurservices: UtilisateurService, public favoriscandidatservice: FavorisCandidatService,
    public localS: LocalStorageClass) {


  }

  ngOnInit() {
    this.favoriscandidatservice.listfavoris.subscribe(
      data => {this.favoris = data ; }
    ) ;
    this.favoriscandidatservice.getfavorisCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {this.favoris = data.length ; } ,
        err => {console.log(err); });


    this.favoriscandidatservice.getCandidatureVue(Number(localStorage.getItem('id')))
      .subscribe(data1 => {
          for (const c of data1) {
            if (c.document.type === 'CV') {
              this.listcandidatureVue.push(c);
            }
          }
          this.favorisVue = this.listcandidatureVue.length ;
      } ,
        err => {console.log(err); });

    this.favoriscandidatservice.getCandidatureNonVue(Number(localStorage.getItem('id')))
      .subscribe(data2 => {
          for (const c of data2) {
            if (c.document.type === 'CV') {
              this.listcandidatureNonVue.push(c);
            }
          }
          this.favorisNonVue = this.listcandidatureNonVue.length ;

        } ,
        err => {console.log(err); });

        /*****************Utilisateur***********/
    this.utilisateurservices.getUser(Number(localStorage.getItem('id')))
    .subscribe(data1 => {this.utilisateur = data1 ; } ,
      err => {console.log(err); }) ;

  }


}
