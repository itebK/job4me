import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class CompetenceService {

  constructor(public http: Http) { }

  getCompetences() {
    return this.http.get('http://localhost:8080/competence')
      .map(resp => resp.json());

  }


}
