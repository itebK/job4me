import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Candidat} from '../../models/User/candidat.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CandidatService {
  public  msginscription = new Subject<any>();
  constructor(public http: Http) {
  }

  getCandidat(id: number) {
    return this.http.get('http://localhost:8080/candidat/' + id)
      .map(resp => resp.json());
  }

  allCandidat() {
    return this.http.get('http://localhost:8080/candidat' )
      .map(resp => resp.json());
  }

  addCandidat(candidat: Candidat) {
    return this.http.post('http://localhost:8080/candidats' , candidat)
      .map(resp => resp.json());
  }

  updateCandidat(candidat: Candidat , id: number) {
    return this.http.put('http://localhost:8080/candidats/' + id , candidat)
      .map(resp => resp.json());
  }

  deleteCandidat(id: number) {
    return this.http.delete('http://localhost:8080/candidats/' + id )
      .map(resp => resp.json());
  }

  public addmsg() {
    this.msginscription.next('success') ;
  }
}
