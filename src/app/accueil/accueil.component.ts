import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import {OffreService} from '../../services/entreprise/offre.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {


  customSelected: string;
  statesComplex: String[] = [];

  constructor(public offreservices: OffreService ,
              public router: Router) {
  }

  ngOnInit() {
    this.statesComplex = this.getTitresOffres() ;

  }

  recherche() {
    this.offreservices.recherche(this.customSelected) ;
    this.router.navigate(['/home'] );

    }


  getTitresOffres(): String[] {
    this.offreservices.getTitresOffres()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          this.statesComplex.push(data[i]);
        } }, err => {
        console.log(err);
      });

    return this.statesComplex ;

  }

}
