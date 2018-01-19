import { Component, OnInit } from '@angular/core';
import {Entreprise} from '../../models/User/model.entreprise';
import {EntrepriseService} from '../../services/user/entreprise.service';
import {Offre} from '../../models/offre/model.offre';
import {OffreService} from '../../services/entreprise/offre.service';

@Component({
  selector: 'app-bloc-desc-entreprise',
  templateUrl: './bloc-desc-entreprise.component.html',
  styleUrls: ['./bloc-desc-entreprise.component.css']
})
export class BlocDescEntrepriseComponent implements OnInit {
  listeEntreprise: Entreprise [] = [];
  offre: Offre = new Offre  ;
  entreprise: Entreprise = new Entreprise ();


  constructor(public entrepriseservices: EntrepriseService,
              public offreservices: OffreService) {


  }

  ngOnInit() {
    this.listeEntreprise = this.getEntreprises() ;

  }

  getEntreprises(): Entreprise[] {
    this.entrepriseservices.getEntreprise()
      .subscribe(data => {
        this.listeEntreprise = data ;
      }, err => {
        console.log(err); });
    return this.listeEntreprise ;
  }



}
