import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Entreprise} from '../../models/User/model.entreprise';

@Injectable()
export class EntrepriseService {

  constructor(public http: Http) {
  }

  getEntreprise() {
    return this.http.get('http://localhost:8080/entreprise' )
      .map(resp => resp.json());


  }

  addEntreprise(entreprise: Entreprise) {
    return this.http.post('http://localhost:8080/entreprise' , entreprise )
      .map(resp => resp.json());


  }

  deleteEntreprise(id: number) {
    return this.http.delete('http://localhost:8080/entreprises/' + id )
      .map(resp => resp.json());


  }


  randomEntreprise() {
    return this.http.get('http://localhost:8080/randomEntreprise' )
      .map(resp => resp.json());


  }


}
