import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class TypeContratService {

  constructor(public http: Http) { }


  getTypesContrat() {
    return this.http.get('http://localhost:8080/typeContrat')
      .map(resp => resp.json());

  }


}
