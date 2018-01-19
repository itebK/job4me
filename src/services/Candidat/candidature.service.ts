import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Formation} from '../../models/cv/formation.model';
import {Candidature} from '../../models/candidat/candidature.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CandidatureService {

  public  listArchiveEntreprise = new Subject<any>();
  constructor(public http: Http) { }

  addCandidature(candidature: Candidature) {
    return this.http.post('http://localhost:8080/candidatures' , candidature)
      .map(resp => resp.json());
  }
  deleteCandidature(idCandidature: number ) {
    return this.http.delete('http://localhost:8080/candidatures/' + idCandidature )
      .map(resp => resp.json());
  }

  editCandidature(id: number , candidature: Candidature) {
    return this.http.put('http://localhost:8080/candidatures/' + id , candidature)
      .map(resp => resp.json());
  }

  getCandidatureCandidat(id: number) {
    return this.http.get('http://localhost:8080/CandidaturesCandidat/' + id)
      .map(resp => resp.json());
  }

  getCandidatureEntreprise(idEntreprise: number) {
    return this.http.get('http://localhost:8080/candidatureEntreprise/' + idEntreprise)
      .map(resp => resp.json());
  }

  getcandidatureArchiverEntreprise(id: number) {
    this.http.get('http://localhost:8080/candidatureArchiverEntreprise/' + id)
      .map(resp => resp.json())
      .subscribe(data => {
        this.listArchiveEntreprise.next(data ) ;
      }, err => {
        console.log(err); }) ;
    return this.listArchiveEntreprise ;

  }


}
