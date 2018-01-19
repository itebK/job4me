import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OffreService} from '../../services/entreprise/offre.service';
import {Offre} from '../../models/offre/model.offre';
import {Entreprise} from '../../models/User/model.entreprise';
import {Poste} from '../../models/offre/model.post';
import {Competence} from '../../models/offre/model.competence';
import {PieceJointe} from '../../models/candidat/pieceJointe.model';
import {PieceJointeService} from '../../services/Candidat/pieceJointe.service';
import {CandidatureService} from '../../services/Candidat/candidature.service';
import {PostulerService} from '../../services/Candidat/postuler.service';
import {Candidature} from '../../models/candidat/candidature.model';
import {Postuler} from '../../models/candidat/postuler.model';
import {Document} from '../../models/candidat/document.model';
import {TypeContrat} from '../../models/offre/model.typeContrat';
import {isNullOrUndefined} from 'util' ;
import { LocalStorageClass } from '../localStorageClass';
import {isUndefined} from 'ngx-bootstrap/bs-moment/utils/type-checks';
import {CandidatService} from '../../services/user/candidat.service';
import {FavorisCandidatService} from '../../services/Candidat/favorisCandidat.service';
import {FavorisCandidatOffre} from '../../models/candidat/favorisCandidatOffre.model';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {


  id: number;
  testPostuler: number = 0 ;
  errorCv: string ;
  favrisOffre: FavorisCandidatOffre = new FavorisCandidatOffre ;
  entreprise: Entreprise = new Entreprise () ;
  typeContrat: TypeContrat = new TypeContrat () ;
  offre: Offre = new Offre ;
  offre2: Offre = new Offre ;
  candidature: Candidature = new Candidature ;
  postuleCv: Postuler = new Postuler();
  postuleLettre: Postuler = new Postuler();
  competences: Array<Competence> = [];
  listeCv: PieceJointe [] = [] ;
  listeLettreMotivation: PieceJointe [] = [] ;
  selectedLettreMotivation: any;
  selectedCv: any;
  test: number ;
  testFavoris: number = 0 ;


  constructor(public activatedRoute: ActivatedRoute,
              public offreService: OffreService ,
              public favoriscandidatservices: FavorisCandidatService ,
              public candidatureService: CandidatureService ,
              public candidatservices: CandidatService ,
              public postulerService: PostulerService ,
              public pieceJointeService: PieceJointeService,
              public localS: LocalStorageClass) {
  this.offre.entreprise = this.entreprise ;
  this.offre.competences = this.competences ;
  this.offre.typeContrat = this.typeContrat ;
  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.offre = this.getoffre(this.id) ;
    this.listeCv = this.getListeCvCandidat(Number(localStorage.getItem('id')));
    this.listeLettreMotivation = this.getListeLettredMotivation(Number(localStorage.getItem('id'))) ;
    this.postulerService.VerifCandidatOffre(Number(localStorage.getItem('id')), this.id)
      .subscribe(data => {
        if (!isNullOrUndefined(data)) {
          this.testPostuler = 1;
        }
      }, err => {
        console.log(err); }) ;
    this.favoriscandidatservices.getfavorisCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {
        this.offreService.getoffre(this.id)
          .subscribe(data2 => {
            this.offre2 = data2 ;
            if (isNullOrUndefined(data.find(x => x.offre.idOffre ===  this.offre2.idOffre ))) {
              this.testFavoris = 1 ;
            }
          }, err => {
            console.log(err); }) ;
        } ) ;



  }

  addfavoris(offre: Offre) {
    this.candidatservices.getCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {
        this.favrisOffre.candidat = data ; } );

    this.favoriscandidatservices.getfavorisCandidat(Number(localStorage.getItem('id')))
      .subscribe(data => {

          this.favrisOffre.offre = offre ;
          this.favoriscandidatservices.addfavorisCandidat(this.favrisOffre , Number(localStorage.getItem('id')) ) ;
          this.testFavoris = 0;

         } ) ;

  }

  getoffre(idOffre: number): Offre {

    this.offreService.getoffre(idOffre)
      .subscribe(data => {
        this.offre = data ;
      }, err => {
        console.log(err); }) ;
    return this.offre ;
  }


  getListeCvCandidat(idCandidat: number): PieceJointe[] {
    this.pieceJointeService.getListeCvCandidat(idCandidat)
      .subscribe(data => {
        this.listeCv = data ;
         console.log(data);
      }, err => {
        console.log(err); }) ;
    return this.listeCv ;
  }


  getListeLettredMotivation(idCandidat: number): PieceJointe[] {
    this.pieceJointeService.getListeLettredMotivation(idCandidat)
      .subscribe(data => {
        this.listeLettreMotivation = data ;
      }, err => {
        console.log(err); }) ;
    return this.listeCv ;
  }


  postuler(offre: Offre , cv: PieceJointe, lettre: PieceJointe) {
    this.candidature.offre = offre ;
    this.candidature.dateDepot = new Date() ;
    if (!(isNullOrUndefined(cv) || isNullOrUndefined(lettre) ) ) {
      this.candidatureService.addCandidature(this.candidature)
        .subscribe(data => {
          this.candidature = data;
          this.postuleCv.candidature = this.candidature;
          this.postuleCv.document = new Document();
          this.postuleCv.document.idDocument = cv.idDocument;
          this.postulerService.savepostuler(this.postuleCv)
            .subscribe(data1 => {
              this.test = 1;
            }, err => {
              console.log(err);
            });
          this.postuleLettre.candidature = this.candidature;
          this.postuleLettre.document = new Document();
          this.postuleLettre.document.idDocument = lettre.idDocument;
          this.postulerService.savepostuler(this.postuleLettre)
            .subscribe(data2 => {
            }, err => {
              console.log(err);
            });
        }, err => {
          console.log(err);
        });
    }else {

      this.errorCv = 'Vous devez envoyer un CV et une Lettre de motivation' ;
    }
  }

}
