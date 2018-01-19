import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Formation} from '../../models/cv/formation.model';


@Injectable()
export class FormationService {

  constructor(public http: Http) { }

  saveFormation(formation: Formation) {
    return this.http.post('http://localhost:8080/formation', formation)
      .map(resp => resp.json());
  }

  deletetFormation(formation: Formation) {
    return this.http.delete('http://localhost:8080/formations/' + formation.idFormation)
      .map(resp => resp.json());
  }

  listeFormationCandidat(id: number) {
    return this.http.get('http://localhost:8080/listeformations/' + id)
      .map(resp => resp.json());
  }

}
