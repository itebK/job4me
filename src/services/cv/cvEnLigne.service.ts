import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {CvEnLigne} from '../../models/cv/cv_en_ligne.model' ;
import {Document} from '../../models/candidat/document.model' ;

@Injectable()
export class CvEnLigneService {

  constructor(public http: Http) { }

  getCvCandidatById(id: number) {
    return this.http.get('http://localhost:8080/cvenligne_candidat/' + id)
      .map(resp => resp.json());
  }

  editCvEnLigne(cvEnLigne: CvEnLigne, id: number) {
    return this.http.put('http://localhost:8080/cvenlignes/' + id, cvEnLigne )
      .map(resp => resp.json());

  }

  addCvEnLigne(cvEnLigne: Document) {
    return this.http.post('http://localhost:8080/cvenlignes', cvEnLigne )
      .map(resp => resp.json());

  }




}
