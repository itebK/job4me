import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import {OffreService} from '../../services/entreprise/offre.service';
import {CompetenceService} from '../../services/entreprise/competence.service';
import {Competence} from '../../models/offre/model.competence';
import {isUndefined} from 'util';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
    min: number = 10000;
    max: number = 90000;


  salaireInput: number = 15000;
  competences: Competence[] = [] ;
  selectedCompetence: String[] = [] ;

  autocompleteTagList: string[] = [];
  TypeList = [
    {type: 'CDI'},
    {type: 'CDD'},
    {type: 'Freelance'},
    {type: 'Stage'}
  ];
  SelectedType: String [] = [] ;

  constructor(public offreService: OffreService ,
              public competenceService: CompetenceService
  ) { }

  ngOnInit() {

    /*---------------------Liste des competences-----------------------*/
    this.competenceService.getCompetences()
      .subscribe(data => {
        this.competences = data ;
        for (const l of this.competences ) {
          this.autocompleteTagList.push(l.libelle) ;
        }
      }, err => {
        console.log(err); }) ;

  }

  recherche(formData) {
    this.SelectedType = [];
    this.selectedCompetence = [];
    for (const l of this.TypeList) {
      if (formData[l.type]) {
        this.SelectedType.push(l.type);
      }
    }
    for (const c of formData.competence) {
      this.selectedCompetence.push(c.value);
    }

    if (this.selectedCompetence.length === 0) {
      this.selectedCompetence = this.autocompleteTagList ;
      this.offreService.filtreType(this.SelectedType, formData.salaire);
    } else if (this.SelectedType.length === 0) {
      this.offreService.filtreSalaire(formData.salaire, this.selectedCompetence);
    } else {
      this.offreService.filtreoffre(this.SelectedType, formData.salaire, this.selectedCompetence);
    }


  }


}
