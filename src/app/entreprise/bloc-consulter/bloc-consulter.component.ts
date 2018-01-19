import {Component, OnInit, TemplateRef} from '@angular/core';
import {Offre} from '../../../models/offre/model.offre';
import {Ville} from '../../../models/offre/enum.ville' ;
import {CompetenceService} from '../../../services/entreprise/competence.service';
import {Competence} from '../../../models/offre/model.competence';
import {OffreService} from '../../../services/entreprise/offre.service';
import {TypeContratService} from '../../../services/entreprise/typeContrat.service' ;
import {TypeContrat} from '../../../models/offre/model.typeContrat';
import {Entreprise} from '../../../models/User/model.entreprise';
import {Poste} from '../../../models/offre/model.post';
import {PosteService} from '../../../services/entreprise/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bloc-consulter',
  templateUrl: './bloc-consulter.component.html',
  styleUrls: ['./bloc-consulter.component.css']
})
export class BlocConsulterComponent implements OnInit {


  listType: TypeContrat[] = [] ;
  listPoste: Poste[] = [] ;
  listOffre: Offre[] = [] ;
  ville: Ville;
  offre: Offre = new Offre () ;
  typeContrat: TypeContrat = new TypeContrat () ;
  competences: Competence[] = [] ;
  entreprise: Entreprise = new Entreprise() ;
  listville: String[] = [] ;

  constructor(public competenceService: CompetenceService,
              public offreService: OffreService,
              public posteService: PosteService,
              public router: Router,
              public typeContratService: TypeContratService) {
    this.offre.competences = this.competences ;
    this.offre.entreprise = this.entreprise ;
    this.offre.typeContrat = this.typeContrat ;

  }


  ngOnInit() {
    /*--------------------liste des offres -------------------*/
    this.offreService.getoffreEntreprise(Number(localStorage.getItem('id')))
      .subscribe( data => {
        this.listOffre = data ; }
      ) ;


    for (const n in Ville) {
      if (typeof Ville[n] === 'number') {
        this.listville.push(n); }
    }

    this.competenceService.getCompetences()
      .subscribe(data => {
        this.competences = data ;
      }, err => {
        console.log(err); }) ;

    this.typeContratService.getTypesContrat()
      .subscribe(data => {
        this.listType = data ;
      }, err => {
        console.log(err); }) ;

    this.posteService.getPostes()
      .subscribe(data => {
        this.listPoste = data ;
      }, err => {
        console.log(err); }) ;
  }

  onSaveOffre(dataForm) {


    this.offre.titre = dataForm.titre ;
    this.offre.ville = dataForm.ville ;
    this.offre.salaire = dataForm.salaire ;
    for (const comp of dataForm.competence ) {
      this.offre.competences.push(comp) ;
    }
    this.offre.dateCreation = dataForm.dateCreation ;
    this.offre.dateExpiration = dataForm.dateExpiration ;
    this.offre.entreprise.idUtilisateur  =  Number(localStorage.getItem('id')) ;
    this.offre.poste = dataForm.poste ;
    this.offre.typeContrat = dataForm.type ;
    this.offre.description = dataForm.description ;


    this.offreService.addoffre(this.offre)
      .subscribe(data => {
          this.offreService.getoffreEntreprise(Number(localStorage.getItem('id')))
            .subscribe( data1 => {
            }
            ) ;
          this.offre.titre = '' ;
          this.offre.idOffre = null ;
          this.offre.competences = [] ;

        } ,
        err => {console.log(err); });


  }

  /*----------------------Redirection -------------------------*/
  getOffre(idOffre: number) {
    this.router.navigate(['offre', idOffre]);

  }


  removeOffre(index: number) {
    this.offreService.deleteoffre(this.listOffre[index].idOffre).subscribe(data => {this.listOffre.splice(index, 1); } ,
      err => {console.log(err); });
  }



}
