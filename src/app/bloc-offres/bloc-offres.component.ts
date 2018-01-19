import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';
import {OffreService} from '../../services/entreprise/offre.service';
import {Offre} from '../../models/offre/model.offre';
import {ActivatedRoute, Router} from '@angular/router';
import {FavorisCandidatService} from '../../services/Candidat/favorisCandidat.service';
import {CandidatService} from '../../services/user/candidat.service';
import {FavorisCandidatOffre} from '../../models/candidat/favorisCandidatOffre.model';
import { LocalStorageClass } from '../localStorageClass';
import {isUndefined} from 'util';

@Component({
  selector: 'app-bloc-offres',
  templateUrl: './bloc-offres.component.html',
  styleUrls: ['./bloc-offres.component.css']
})
export class BlocOffresComponent implements OnInit {

  listOffres: Offre[] = [];
  favrisOffre: FavorisCandidatOffre = new FavorisCandidatOffre ;
  customSelected: string = '';
  statesComplex: any[] = [] ;
  testfavoris: boolean ;
    /*= [
    { id: 1, name: 'Developpeur jee', region: 'tunis' },
    { id: 2, name: 'Designer', region: 'sousse' },
    { id: 3, name: 'Consultant Jee', region: 'ben arous' }];
    */

  constructor(public offreservices: OffreService ,
              public favoriscandidatservices: FavorisCandidatService ,
              public candidatservices: CandidatService ,
              public localS: LocalStorageClass,
              public router: Router) {


  }

  ngOnInit() {
    /* Liste des offres */
    this.offreservices.listOffres.subscribe(
      data => {
        this.listOffres = data ; }
    ) ;


  }
 /*-----------------------Récupérer tout les offres-------------------------*/
  getlisteoffres(): Offre[] {
    this.offreservices.getoffres()
      .subscribe(data => {
        this.listOffres = data;
      }, err => {
        console.log(err); });
    return this.listOffres ;
  }
  /*----------------------Marker une offre comme favoris s'il n'est pas déja -------------------------*/

  addFavoris(offre: Offre ) {
    this.candidatservices.getCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {
        this.favrisOffre.candidat = data ; } );

    this.favoriscandidatservices.getfavorisCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {
        if (isUndefined(data.find(x => x.offre.idOffre === offre.idOffre))) {
    this.favrisOffre.offre = offre ;
        this.favoriscandidatservices.addfavorisCandidat(this.favrisOffre , Number(localStorage.getItem('id')) ) ;

    }else {
      alert('offre deja favoris') ;

    } } ) ;
   }


  /*----------------------Redirection -------------------------*/
  getOffre(idOffre: number) {
    this.router.navigate(['offre', idOffre]);

  }

  removeOffre(index: number) {
    this.offreservices.deleteoffre(this.listOffres[index].idOffre)
      .subscribe(data => {
        this.listOffres.splice(index, 1);
      }, err => {
        console.log(err); });
  }




}
