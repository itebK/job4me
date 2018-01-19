import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {FavorisCandidatOffre} from '../../models/candidat/favorisCandidatOffre.model' ;
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FavorisCandidatService {
  public  listfavoris = new Subject<number>();
  constructor(public http: Http) {
  }

  addfavorisCandidat(candidatOffre: FavorisCandidatOffre , idCandidat: number) {
    this.http.post('http://localhost:8080/favoriscandidatoffre' , candidatOffre)
      .map(resp => resp.json()).subscribe(data => {

      this.http.get('http://localhost:8080/favorisCandidat/' + idCandidat)
        .map(resp => resp.json()).subscribe(data1 => {
        this.listfavoris.next(data1.length );
      }, err => {
        console.log(err); });

      }, err => {
        console.log(err); });




  }

  getfavorisCandidat(id: number) {
    return this.http.get('http://localhost:8080/favorisCandidat/' + id)
      .map(resp => resp.json()) ;
  }
  deletefavorisCandidat(idCandidat: number , idOffre: number)  {
    return this.http.delete('http://localhost:8080/favoriscandidatoffre/' + idCandidat + '/' + idOffre)
      .map(resp => resp.json());
  }


  getCandidatureVue(id: number) {
    return this.http.get('http://localhost:8080/Candidatures_Vue/' + id)
      .map(resp => resp.json());

  }

  getCandidatureNonVue(id: number) {
    return this.http.get('http://localhost:8080/Candidatures_Non_Vue/' + id)
      .map(resp => resp.json());

  }



}
