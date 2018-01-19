import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Postuler} from '../../models/candidat/postuler.model';

@Injectable()
export class PostulerService {

  constructor(public http: Http) { }

  deletePostCandidat(idCandidature: number , idDocument: number) {
    return this.http.delete('http://localhost:8080/postulers/' + idCandidature + '/' + idDocument)
      .map(resp => resp.json());
  }

  savepostuler(postule: Postuler) {
    return this.http.post('http://localhost:8080/postuler', postule)
      .map(resp => resp.json());
  }

  updatepostuler(postule: Postuler, idCandidature: number , idDocument: number) {
    return this.http.put('http://localhost:8080/postulers/' + idCandidature + '/' + idDocument, postule)
      .map(resp => resp.json());
  }

  getpostuler(id: any) {
    return this.http.get('http://localhost:8080/postuler/' + id)
      .map(resp => resp.json());
  }

  getCandidature(id: number) {
    return this.http.get('http://localhost:8080/getCandidaturepostuler/' + id)
      .map(resp => resp.json());
  }

  VerifCandidatOffre(idCandidat: number , idOffre: number) {
    return this.http.get('http://localhost:8080/VerifCandidatOffre/' + idCandidat + '/' + idOffre)
      .map(resp => resp.json());
  }


}


