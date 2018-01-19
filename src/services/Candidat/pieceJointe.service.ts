import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { JsonObject } from '@angular-devkit/core';

@Injectable()
export class PieceJointeService {

  constructor(public http: Http) { }

  getListeCvCandidat(id: number) {
    return this.http.get('http://localhost:8080/piecejointeCV/' + id)
      .map(resp => resp.json());
  }

  getListeLettredMotivation(id: number) {
    return this.http.get('http://localhost:8080/piecejointeLettreMotivation/' + id)
      .map(resp => resp.json());
  }

  deletePieceJointe(id: number) {
    return this.http.delete('http://localhost:8080/piecejointes/' + id)
      .map(resp => resp.json());
  }

  setLettreCandidat(formData: JsonObject) {
    return this.http.post('http://localhost:8080/piecejointeLettreMotivation', formData)
      .map(resp => resp.json());
  }

  setCvCandidat(formData: JsonObject) {
    return this.http.post('http://localhost:8080/piecejointeCV', formData)
      .map(resp => resp.json());
  }






}
