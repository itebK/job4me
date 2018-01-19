import { Component, OnInit } from '@angular/core';
import {EntrepriseService} from '../../../services/user/entreprise.service';
import {Entreprise} from '../../../models/User/model.entreprise';
import {Candidat} from '../../../models/User/candidat.model';
import {CandidatService} from '../../../services/user/candidat.service';

@Component({
  selector: 'app-bloc-compte',
  templateUrl: './bloc-compte.component.html',
  styleUrls: ['./bloc-compte.component.css']
})
export class BlocCompteComponent implements OnInit {


  listeCandidat: Candidat[] = [];
  listeEntreprise:  Entreprise [] = [];

  constructor(public entrepriseservices: EntrepriseService,
              public candidatservice: CandidatService) { }

  ngOnInit() {
    this.listeEntreprise = this.getEntreprises() ;
    this.listeCandidat = this.getCandidats() ;

  }

/* AJOUTER - REMOVE CANDIDAT */
  addCandidat(arg) {
    this.listeCandidat.push(arg);
  }

  removeCandidat(index) {
    this.candidatservice.deleteCandidat(this.listeCandidat[index].idUtilisateur)
      .subscribe(data => {
        this.listeCandidat.splice(index, 1);
      }, err => {
        console.log(err); });
  }

 /* AJOUTER - REMOVE ENTREPRISE */
  addEntreprise(arg) {
    this.listeEntreprise.push(arg);
  }

  removeEntreprise(index) {
    this.entrepriseservices.deleteEntreprise(this.listeEntreprise[index].idUtilisateur)
      .subscribe(data => {
        this.listeEntreprise.splice(index, 1);
    }, err => {
      console.log(err); });
  }





  getEntreprises(): Entreprise[] {
    this.entrepriseservices.getEntreprise()
      .subscribe(data => {
        this.listeEntreprise = data ;
      }, err => {
        console.log(err); });
    return this.listeEntreprise ;
  }

  getCandidats(): Candidat[] {
    this.candidatservice.allCandidat()
      .subscribe(data => {
        this.listeCandidat = data ;
      }, err => {
        console.log(err); });
    return this.listeCandidat ;
  }




}
