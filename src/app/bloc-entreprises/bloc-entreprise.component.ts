import { Component, OnInit } from '@angular/core';
import {Entreprise} from '../../models/User/model.entreprise';
import {EntrepriseService} from '../../services/user/entreprise.service';
import { LocalStorageClass } from '../localStorageClass';


@Component({
  selector: 'app-bloc-entreprises',
  templateUrl: './bloc-entreprise.component.html',
  styleUrls: ['./bloc-entreprise.component.css']
})
export class BlocEntrepriseComponent implements OnInit {


  listeEntreprise: Entreprise [] = [] ;
  constructor(public entrepriseService: EntrepriseService, public localS: LocalStorageClass) { }

  ngOnInit() {
    this.randomEntreprise() ;
  }

  randomEntreprise() {
    this.entrepriseService.randomEntreprise()
      .subscribe(data => {
        this.listeEntreprise = data ;
      }, err => {
        console.log(err); }) ;
  }

}
